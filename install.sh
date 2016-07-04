#!bin/sh
echo "starting installation.."

echo "installing npm"

if [ "$(npm --verion)" != "" ]
then
	echo "npm already installed.."
else
 
	sudo apt-get install npm

	if [ echo $? -eq 0 ]
	then
		echo "installation failure.."
	else
		echo "npm installed.."
	fi
fi

#npm install angular

#cp node_modules/angular App/content/lib 

if [ ! -e $(pwd)/mongodb/mongodb-linux-x86_64-3.0.12 ]
then
	echo "installing MongoDB.."
	curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.12.tgz

	tar -zxvf mongodb-linux-x86_64-3.0.12.tgz

	mkdir -p mongodb

	cp -R -n mongodb-linux-x86_64-3.0.12/ mongodb
fi

	dir=$(pwd)

	path=$dir/mongodb/mongodb-linux-x86_64-3.0.12

	touch $dir/evalfile.sh
	cat > $dir/evalfile.sh <<EOF
#!/bin/sh
echo "export PATH=$path/bin:$PATH"
EOF

	chmod 777 $dir/evalfile.sh

	eval `$dir/evalfile.sh`


	if [ -e "/data/db" ] 
	then
		echo "/data/db exists.. "
	else
		mkdir -p /data/db
		chmod 777 /data/db
		echo '/data/db created'
	fi

echo "starting API server and Database Server..."

mongod && nodejs server.js

#while :
#do
#	sleep 5
#	grep -q '27017' mongoserver.log && break
#done

#nodejs server.js

