---
title: Search and Rescue with TAK
description: Search and Rescue civilians stranded on their rooftop after a flood.
---

In emergency response situations, it is always a race against the clock for first responders.

They use drones and specialized tools to improve their situational awareness and make life saving decisions.

One of the tools that many first responers use is Android Team Awareness Kit (ATAK). You can think of it like a really specialized Google Maps that allows for first responders to mark locations, pictures, videos, and more onto a shared map so that they can all work together to help people.

Watch this video and try to count how many different uses are shown for ATAK. (Click the picture below to start the video)

[![IMAGE ALT TEXT](https://i.imgur.com/Fsfl0AK.png)](http://www.youtube.com/watch?v=fiBt0wEiKh8 'TAK Video')

Situational Awareness Saves lives; consider the testimonial from this fire fighter.

![Situational Awareness Saves Lives](https://i.imgur.com/c6elTOm.png)

## Search and Rescue Competition

STEMx Students will compete in a simulated search and rescue exercise on their local football field.

There are 5 "civilians" stranded on their roof after a flood, but the local rescue team cant check every house.

These civilians will be represented by basketballs in buckets on top of ladders. The Search team can use the drone and drop markers of where the stranded "civilians" are, and the Rescue team can connect to the TAK Server at the edge to see the marked locations and rescue all 5 civilians in the shortest amount of time.

![Search and Rescue Game Schematic](https://i.imgur.com/MNpEFjy.png)

---

### 1. Lay out STEM Kits

The bill of materials required to play this Search and Rescue game is as follows:

```
- Two Android Phones with ATAK installed (one for Search Team one for Rescue Team)
- One TAK Server (either on the cloud or on a Raspberry Pi at the Edge)
- One drone (DJI is most popular)
- 5 basketballs (or other props that represent civilians)
- 5 ladders (or other props that represent rooftops)
- Open airspace to fly drones at 100ft
- A router to so Search Team can send data to Rescue Team
- Raspberry Pi Kit (with portable power source)

```

### 2. Check airpace restrictions at FAA.gov

This is a Search and Rescue simulation, and one critical consideration for both first responders and STEMx students to consider is making sure the airspace is safe so that we don't create additional risk of aircraft collision.

The FAA has an updated map that shows the maximum allowed altitude of Unmanned Aerial Systems (UAS), aka drones.

Notice in the image below that the airspace around Dulles Airport is a "no-fly zone," where the maximum altitude is reduced to zero. STEMx students and coaches will need to check the FAA map to ensure they're flying their drone in allowed airspace at [FAA.gov](https://e0.flightcdn.com/adsb/images/Windows_bit.PNG).

![FAA Restricted Airspace image](https://i.imgur.com/CLB23yz.png)

### 3. Check connection to TAK Server

It will be critical for the Search TAK user to share the map locations and pictures of the "civilians" so that the Rescue TAK user to go save them from the "rooftop".

Map locations and pictures can be shared to all devices connected to a TAK Server. The TAK Server can run without internet connection (as is common in disastor relief scenarios) on a Raspberry Pi. The Raspberry Pi will come preloaded with the TAK Server that will run automatically. (If you want to build the TAK Sensor on your Pi from scratch, checkout this [tutorial](https://stemx.app/tak-server-on-raspberry-pi))

Make sure your Raspberry Pi is connected to the same router as the phones then open TAK, press the hamburger icon in the top right, press Settings, press Network Preferences, press Server Connections and you should see the Raspberry Pi TAK Server connection lit up with a green dot. This means you are successfully connected to the server!

### 4. Check the UAS is showing a video feed inside of ATAK

TAK Plugins are apps that can run inside of ATAK, and they provide additional functionality. (Later in the STEMx course, students will have the opportunity to design their own TAK Plugins).

The Android phones will come preloaded with an ATAK Plugin called UAS Tool. (A tutorial for how to load ATAK plugins is coming soon, but is currently available on the internet for good searchers!) UAS Tool allows the user to see their UAS video feed and drop icons on the map for situational awareness.

### 5. Fly your drone and mark locations

Once you have UAS Tool running and your feed coming through in ATAK, you can drop "Sensor point of interest" pins on the map for the Rescue Team to see where the stranded civilians are. A tutorial for how to mark the sensor point of interest on the map is coming soon, but curious STEMx students will be able to figure out with a little trial and error.

### 6. Rescue Civilians and record your time!

If both ATAK devices are connected to the server, then the marked locations should be coming through to the Rescue Team and hey can run to rescue the civilians from the rooftop.

Share your time, pictures and screenshots from your event with your Coach and they can unlock your SEARCH AND RESCUE Skill Tree Badge and enter you for scholarship opportunities.

---

## Solve real world problems

Now that you're an expert on how first responders use TAK, drones, and sensors to help in disastor situations, can you think of real life applications that may be useful for your school or first responders in your city? Tell your coach your idea and they may be able to help get you the STEM kit materials you need to make your vision a reality!
