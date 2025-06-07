import { Server as SocketIOServer } from 'socket.io';
import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

// تخزين كائن الخادم بشكل عام
let io;

export async function GET(request) {
  try {
    // إذا كان الخادم غير مهيأ، قم بتهيئته
    if (!io) {
      // إنشاء خادم Socket.io
      const httpServer = new SocketIOServer({
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
      
      // تعيين كائن الخادم
      io = httpServer;
      
      // استماع لأحداث الاتصال
      io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        
        // استماع لأحداث إرسال الرسائل
        socket.on('send-message', async (data) => {
          try {
            // التحقق من البيانات المطلوبة
            if (!data.message || !data.sender || !data.userId) {
              return;
            }
            
            // محاولة إضافة الرسالة عبر chatStore
            try {
              const newMessage = {
                message: data.message,
                sender: data.sender,
                userId: data.userId,
                senderAvatarId: data.senderAvatarId || 1,
                timestamp: new Date().toISOString(),
                interaction: {
                  likes: [],
                  isLiked: false
                }
              };
              
              const savedMessage = chatStore.addMessage(newMessage);
              
              // بث الرسالة لجميع المتصلين
              io.emit('new-message', savedMessage);
            } catch (error) {
              console.error('Error adding message via socket:', error);
            }
          } catch (error) {
            console.error('Error processing socket message:', error);
          }
        });
        
        // استماع لأحداث الكتابة
        socket.on('user-typing', (data) => {
          if (data && data.username) {
            // بث حالة الكتابة لجميع المتصلين
            socket.broadcast.emit('user-typing', data);
          }
        });
        
        // استماع لأحداث قطع الاتصال
        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
      });
      
      // بدء الاستماع على المنفذ
      console.log('Socket.IO server initialized');
    }
    
    return NextResponse.json({
      success: true,
      status: 'Socket.IO server running'
    });
  } catch (error) {
    console.error('Error initializing Socket.IO server:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في تهيئة خادم Socket.IO'
    }, { status: 500 });
  }
} 