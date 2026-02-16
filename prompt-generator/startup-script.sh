#!/bin/bash
apt-get update
apt-get install -y nginx
echo "Hello alper from dfgaziantep!" > /var/www/html/index.html