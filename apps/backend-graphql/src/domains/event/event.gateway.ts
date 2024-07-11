import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '@/domains/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleMessage(
    @MessageBody() data: { content: string; userId: string; groupId: string },
  ): void {
    this.prisma.message
      .create({
        data: {
          content: data.content,
          user: {
            connect: {
              id: data.userId,
            },
          },
          group: {
            connect: {
              id: data.groupId,
            },
          },
        },
      })
      .then(async (message) => {
        const newMessage = await this.prisma.message.findUnique({
          where: {
            id: message.id,
          },
          include: {
            user: true,
          },
        });

        this.server.to(data.groupId).emit('newMessage', newMessage);
      });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: { groupId: string }) {
    client.join(payload.groupId);
  }
}
