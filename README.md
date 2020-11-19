# betPlayground

Running Flask app locally:
$ export FLASK_APP=server.py
$ flask run
 * Running on http://127.0.0.1:5000/


 In prod environment:
 flask run --host=0.0.0.0

 SSH into Host:
 ssh -i ~/Downloads/pythonserverkey2.pem ec2-user@ec2-3-138-134-6.us-east-2.compute.amazonaws.com

 Deploy code (jank af):
 tar -zcvf archive-name.tar.gz betPlayground
 scp -i ~/Downloads/pythonserverkey2.pem archive-name.tar.gz ec2-user@ec2-3-138-134-6.us-east-2.compute.amazonaws.com:/home/ec2-user
