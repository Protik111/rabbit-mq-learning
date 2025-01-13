sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
sudo docker pull rabbitmq
sudo docker run -d --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -e LANG=de_DE.UTF-8 -e LANGUAGE=de_DE:de -e LC_ALL=de_DE.UTF-8 rabbitmq:3.11-management
