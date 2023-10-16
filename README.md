# whisper-chat-pusher
Pusher server for secure chat application. It receives message parts from users and selects randomly one of the parts to implement steganography. 
After the valuable message is injected into the image, that image is stored on this server and all parts are sent to the message queue services, with Round Robin implementation of sending parts to one or more available message queues (RabbitMQ is used in this implementation). 




Secure chat architecture schema:
![Screenshot from 2023-10-16 22-26-41](https://github.com/StefanErceg/whisper-chat-pusher/assets/24877686/2026afbb-9c09-4b09-a54d-f10f77eba4c2)
