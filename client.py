import socket
s = socket.socket()
s.connect(('192.168.8.122', 1234))
data = s.recv(1024)
print('Received', data)
s.close()
