---
title: PiAware
description: Quidem magni aut exercitationem maxime rerum eos.
---

You can now build and run your own ADS-B ground station that can be installed anywhere and receive real-time data directly from airplanes on your computer.

Your ground station can run FlightAware's PiAware software to track flights within 100-300 miles (line of sight, range depending on antenna installation) and will automatically feed data to FlightAware. You can track flights directly off your PiAware device or via FlightAware.com.

As a thank you from FlightAware, users sending ADS-B data receive the following:

- Live data on flightaware.com (subject to standard data processing delay of up to two minutes)
- Access to up-to-the-second live data received by the local device (accessible from the stats page with a local network connection)
- Data from local device highlighted on FlightAware track logs
- Detailed statistics on site performance
- A free Enterprise Account (USD89.95/mo value)

---

## 1. PiAware Kit

To build a PiAware, you must obtain the following components:

### Components

1. Raspberry Pi 3 / 4 / Zero W
2. Power supply for the Raspberry Pi
   - 5.1 Volts 2.5 Amps power supply recommended
3. Micro SD Card (size: 8 GB or larger)
4. Micro SD card reader
   - If your computer does not have a built-in SD card reader/writer, you will need the optional USB SD card reader/writer.
5. USB SDR ADS-B Receiver (FlightAware Pro Stick or Pro Stick Plus recommended)

   - The USB SDR (Software Defined Radio) ADS-B (Automatic Dependent Surveillance-Broadcast) receiver translates the 1090 MHz radio signal into something the computer can understand

   - Hint: If you are choosing between the FlightAware Pro Stick and the Pro Stick Plus remember the Plus has an on-board filter that works well in locations that have a lot of radio noise, such as urban environments.

6. 1090 MHz Antenna

   - An indoor antenna can be purchased to start. If using the FlightAware USB adapter be sure the antenna has an SMA connector.

   - If you use a telescoping mast antenna be sure to collapse it to a quarter wavelength of 1090 MHz (6.9 cm) to maximize reception.

## 2. Install PiAware on your SD card

Be sure to choose the correct drive to install the image

1. Select and Download your desired PiAware SD card image

   - [PiAware - PiAware Image on Raspbian Linux 7.2 ZIP](https://piaware.flightcdn.com/piaware-sd-card-7.2.img.zip) (599MB)

   - PiAware with LCD display support - PiAware LCD Image on Raspbian Linux 7.2 ZIP (674MB)

     - Currently supported LCD display: Waveshare 3.5inch LCD Display for Raspberry Pi

2. Go to https://etcher.io/ download the SD card writer (approx 80MB) and follow the directions to install the program.

   - Information on your Windows operating system can be found under: Control Panel\\All Control Panel Items\\System. View the Control Panel with small icons to see all the Control Panel options.
   - ![Windows Screenshot](https://e0.flightcdn.com/adsb/images/Windows_bit.PNG)

3. Open Etcher

   - Etcher may need to be run as administrator (right-click, \"Run as Administrator\").
     ![Windows Screenshot](https://e1.flightcdn.com/adsb/images/Etcher_run_as_admin_WINDOWS.png)

4. Select the PiAware zip file.
5. Select the correct Micro SD card USB drive carefully, the process will overwrite any data on the drive and people have lost years worth of pictures accidentally. Consider removing external hard drives and other devices to avoid accidentally overwriting the data
   - Confirm the drive on the 'My Computer' screen. The below image shows the micro SD card as 'Removable Disk F:'.
     ![Windows Screenshot](https://e1.flightcdn.com/adsb/images/Removable_SD_card_name_Windows.PNG)
6. Once you are sure the correct drive is chosen press 'Flash!'.
7. After PiAware is installed Etcher should automatically eject the SD card, if not manually eject the SD card and remove from the computer.

   ![Windows Screenshot](https://e0.flightcdn.com/adsb/images/Etcher_success.png)

Watch the video below for a guide on Programming PiAware onto a Micro SD Card:
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/38V_tNkvc2Q/0.jpg)](https://www.youtube.com/watch?v=38V_tNkvc2Q&ab_channel=FlightAwareADS-B)

## 3. Optional: Enable Wi-Fi

### Option 1: Via Bluetooth.

For PiAware 7.0 or later and a supported browser, you can [set up your PiAware via Bluetooth](https://flightaware.com/adsb/piaware/build/configure).

### Option 2: Manual Configuration

If on board Wi-Fi or a USB adapter will be used to connect to the internet you will need to edit the configuration file. Etcher will automatically eject the Micro SD card after formatting, physically remove the Micro SD card or USB adapter and plug it back into the computer to edit the configuration file.

The configuration file allows the user to configure and set the following

- Wired network
- Wireless (WiFi) network
- PiAware supports unencrypted networks or WPA/WPA2 encrypted networks; WEP is not supported
- Automatic or manual updates\*
- Multilateration (MLAT) output\*
- Receiver type (RTL-SDR, Beast, Radarcape or other Mode S/ADS-B source)
- RTL-SDR gain, PPM and device index
  - indicates a setting that can be configured on the site's statistics page. For full configuration options see advanced configuration

**Configuration File Format**

The configuration file is a simple plain text format file. The TextEdit program on a MAC OS is known for saving in the rich text format and smart quotes so be sure those options are disabled in the program's preferences.

Lines beginning with a “#” are comment lines and are ignored. Blank lines are also ignored. All other lines specify configuration settings.

**Windows**

1.  Open the Explorer program
2.  Select the Micro SD card device labeled piaware
3.  Open the file labeled piaware-config.txt
4.  The file will open in Notepad

Below is the text file opened, instructions to enable Wi-Fi are pointed to with an arrow.

```
#
# This file configures the Piaware sdcard image
# configuration. Whenever the system boots, this
# file is read and its contents are used to
# configure the system.
#
# Lines beginning with a '#' are comment lines
# and are ignored. Blank lines are also ignored.
# All other lines specify configuration settings.
#

#
# WIRED NETWORK CONFIGURATION
#
# Should piaware use the wired ethernet port
# for network access?
wired-network yes

# Wired network configuration:
# Most networks will use DHCP
wired-type dhcp

# Alternatively, a static address configuration
# can be provided; set "wired-type" to static to use this.
wired-address 192.168.1.10
wired-netmask 255.255.255.0
wired-broadcast 192.168.1.255
wired-gateway 192.168.1.254
wired-nameservers 8.8.8.8 8.8.4.4

#
# WIRELESS NETWORK CONFIGURATION
#

# Should piaware use a wifi adaptor
# for network access? You will need to attach
# a supported USB wifi adaptor for this to work.

# change this to "yes" to enable wifi
wireless-network yes

# Wifi SSID and password.
# This should be changed to match your wireless
# network SSID and, for networks that require
# a passphrase, the passphrase.
wireless-ssid MyWifiNetwork <----- replace MyWifiNetwork with the name of your WiFi (aka the SSID of your local network
wireless-password s3cr3t <----- replace s3cr3t with the password to your WiFi

# Wifi network configuration:
# Most networks will use DHCP
wireless-type dhcp

# Alternatively, a static address configuration
# can be provided; set "wireless-type" to static to use this.
wireless-address 192.168.1.10
wireless-netmask 255.255.255.0
wireless-broadcast 192.168.1.255
wireless-gateway 192.168.1.254
wireless-nameservers 8.8.8.8 8.8.4.4
```

**Windows**

1. Once the file has been edited save and close **Notepad**
2. Eject the Micro SD card either in **My Computer** by right clicking and selecting **Eject** or in the system tray.
   ![](https://e1.flightcdn.com/adsb/images/eject_sd_card-Windows.PNG)
3. A pop-up should appear stating it is OK to remove the SD card
   ![](https://e0.flightcdn.com/adsb/images/safe_to_remove_sd_card-Windows.PNG)

## 4. Start your PiAware device

Watch the video below for a guide on putting the PiAware together, claiming, and configuring the antenna height and location:
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/p_GYOV1S02Q/0.jpg)](https://www.youtube.com/watch?v=p_GYOV1S02Q&feature=emb_title&ab_channel=FlightAwareADS-B)

1. Slide the SD card (with PiAware installed) into your Raspberry Pi.
   ![](https://e1.flightcdn.com/adsb/images/Microinpi.jpg)
2. Optional: Put the case on the Raspberry Pi.
3. Plug the USB SDR ADS-B receiver into the Raspberry Pi.
   ![](https://e1.flightcdn.com/adsb/images/USBinPi.jpg)
4. Tightly plug in the antenna cable into the USB SDR ADS-B dongle.
   ![](https://e0.flightcdn.com/adsb/images/AntennatoUSBadapter.jpg)
5. Plug the ethernet (internet) cable in. (If using WiFi skip this step)
6. Plug the power into your Raspberry Pi.
   ![](https://e0.flightcdn.com/adsb/images/Pipowerantenna.jpg)
7. You should observe a solid red LED and a blinking green LED on the Raspberry Pi as well as yellow and green LEDs next to the Ethernet jack.
   ![](https://e1.flightcdn.com/adsb/images/RPi_LEDs.jpg)

## 5. Claim your PiAware client on FlightAware.com

You should wait about four or five minutes for your PiAware to start and then you can associate your FlightAware account with your PiAware device to receive all the benefits.

Once your device is running, please:
Look up the IP address in your router admin and go to the assigned IP address in a browser on the same network. If the device hasn't been claimed a link to claim the PiAware device will display.

Or

Claim your PiAware client on FlightAware.com
If after 5 minutes your device hasn't displayed as claimed try restarting the device, if that still doesn't work re-confirm the Wi-Fi settings (if using Wi-Fi) are correct. Lastly contact us at ADSBsupport@FlightAware.com. Check your stats page (link below) to confirm it was claimed.

![](https://e0.flightcdn.com/adsb/images/Claim_Feed_via_Status.jpg)

## 6. View your ADS-B statistics

1. View your ADS-B stats at: https://flightaware.com/adsb/stats
   FlightAware will begin processing your data immediately and displaying your statistics within 30 minutes.
   ![](https://e0.flightcdn.com/adsb/images/Statistics_page.png)
   or click 'My ADS-B' in the header while signed in. This will only appear after the site has sent data for 30 minutes.
   ![](https://e1.flightcdn.com/adsb/images/my_adsb_in_yellow.png)
2. Configure your location and antenna height on your statistics page by clicking on the gear icon located to the right of the Site name.
   Multilateration, also known as MLAT, functions by pinpointing the location of an aircraft by knowing the locations of sites that received messages from the aircraft.
   ![](https://e0.flightcdn.com/adsb/images/Stats_page_gear_icon.png)
3. The FlightAware stats page will also tell you the local IP of your device and provide a link for direct connection. This is where you can find a link to SkyAware, a web portal for viewing flights the receiver is picking up messages from on a map.
   ![](https://e1.flightcdn.com/adsb/images/Stats_page_skyaware_link.jpg)
   ![](https://e0.flightcdn.com/adsb/images/Skyaware.jpg)

## 7. Success!

Remember that the signals from aircraft are not designed to penetrate objects, so the antenna should be located "line of sight" to the sky with no obstructions. The most optimal installations, which are installed outdoors and on a roof, have a range of over 250mi / 400km.

Enjoy using PiAware and using FlightAware with extra features reserved exclusively for ADS-B feeders like you. Please check out the [discussion forums](https://discussions.flightaware.com/ads-b-flight-tracking-f21/) to share your experiences or learn more.

## Related Links (PiAware, Raspberry Pi, dump1090, and more)

- [FlightAware ADS-B Forums](https://discussions.flightaware.com/ads-b-flight-tracking-f21/)
- [PiAware homepage](https://flightaware.com/adsb/piaware/)
- [Upgrade PiAware ADS-B software](https://flightaware.com/adsb/piaware/upgrade)
- [Multilateration](https://flightaware.com/adsb/mlat/) (MLAT)
- [Change log for recent versions of PiAware](https://github.com/flightaware/piaware_builder/blob/master/changelog)
- [Source code for PiAware](https://github.com/flightaware/piaware)
- [FlightAware dump1090 fork](https://github.com/flightaware/dump1090)
- [Change log for the recent version of dump1090](https://github.com/flightaware/dump1090/blob/master/debian/changelog)
- [Updating and upgrading Raspbian](http://www.raspberrypi.org/documentation/raspbian/updating.md)
- [Advanced Configuration documentation](https://flightaware.com/adsb/piaware/advanced_configuration)
- [PiAware About](https://flightaware.com/adsb/piaware/about)
