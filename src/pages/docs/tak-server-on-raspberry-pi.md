---
title: TAK Server on Raspberry Pi
description: TAK Server on Raspberry Pi
---

This tutorial is helpful for completing the Search and Rescue Challenge.

---

## 1. Install Raspberry Pi OS using Raspberry Pi Imager

Plug in SD Card to PC using either sd card slot or usb sd card reader.

Download the version for your pc at: https://www.raspberrypi.com/software/

Run exe after downloading, select first option for OS and select the SD Card drive and start image burn.
Once complete remove the card and transfer to Raspberry Pi.

Plug in all peripherals

1. Monitor
2. Keyboard
3. Mouse
4. Power Cord

Power on the Pi and follow the prompts, connect to the wifi and run the updates. On complete you will
be prompted to restart the Pi.

Remember the user/password created in this step. If just developing its always easy to remember
raspberry/pi for username and password.

## 2. OPTIONAL - Remote Setup

Now that we have successfully setup our PI lets set up remote desktop so we can access from any pc on
our network. This makes it easy to program the pi from anywhere we want.

Open a command prompt in top left of the pi and run command:

```
Sudo apt install xrdp
```

Type 'Y' when prompted.

Create a user to login

```
sudo adduser raspberry
```

Set the password to pi or something you will remember - we can always create new users
later.
You can leave the rest of the options blank and press enter to continue and complete for
each.

```
sudo adduser raspberry sudo
```

Look for the Wifi Icon in the top right of the raspberry pi screen and hover over it to get your ip address.

This should start with 192. Write this down.

Restart the PI.

Now, on your other computer search for "Remote Desktop Connection" and open.

Enter the IP address you wrote down into the computer location and connect. You will be prompted for
the user and password you created above as well as the user and password from the first creation step
once logged in. Now you can program remotely without needed to setup all the extras with the pi.

![remote instructions screenshot](https://i.imgur.com/e7nHMLN.png)
Use your IP here that you wrote down from PI

## 3. TAK Server Installation

Open a command prompt and run the following:

```
sudo apt update && sudo apt install python3 && sudo apt install python3-pip
sudo apt update && sudo apt install python3-pip
sudo apt install python3-dev python3-setuptools build-essential python3-gevent python3-lxml libcairo2-
dev
sudo pip3 install wheel pycairo
sudo python3 -m pip install FreeTAKServer[ui]
```

Open file directory and go to:
/usr/local/lib/python3.9/dist-packages/FreeTAKServer/controllers/configuration

Open file MainConfig.py and change line 18 to 'python3.9' and save the file

![mainconfig.py](https://i.imgur.com/PRgUDQv.png)

If permission errors when changing file - Open command prompt and type following:

```
cd /usr/local/lib/python3.9/dist-packages/FreeTAKServer
sudo chmod 777 -R FreeTAKServer
```

Now you will be able to change and save the file above.

Run:

```
sudo python3 -m FreeTAKServer.controllers.services.FTS
```

Enter yes when asked and for the rest of the options leave default blank and press "Enter" to continue
for all. The TAK server should now be running, and you will see data coming in:

![TAK Server Message on init](https://i.imgur.com/dBiibQl.png)

You can hit the TAK server by opening a browser and entering localhost:8080

This will show in the logs!

Now you can connect to this TAK server on your Android device with ATAK!

Just connect to the ipaddress of the pi at port 8087, select tcp and you will see the data streaming to
your pi!

## 4. Running the UI

```
cd /usr/local/lib/python3.8/dist-packages/FreeTAKServer-UI
```

Edit config.py

Change IP, APPIP and WEBMAPIP to you ip on the pi

Open browser and go to: localhost:5000/index

login with admin/password

So, in future we can start the TAK server with:

```
sudo python3 -m FreeTAKServer.controllers.services.FTS
```

Launch the GUI:

```
sudo /usr/local/lib/python3.9/dist-packages/FreeTAKServer-UI/python3 run.py
```

![FTS GUI](https://i.imgur.com/V5CQaGe.png)

Congrats! You have an operational TAK Server running on your Raspberry Pi! Now go connect to it from ATAK and you can share map data with all other connected users. You're ready to take on the Search and Rescue challenge! Send a screenshot of your TAK Server running to your coach to unlock your TAK Server Skill Tree badge.
