import socket
s = socket.socket()
s.bind(('192.168.8.143', 1234))
s.listen(1)
print("server is listening.. ")

while True:
    conn, addr = s.accept()
    print('Connected by', addr)
    conn.send(b'Hello Client')
    conn.close()
