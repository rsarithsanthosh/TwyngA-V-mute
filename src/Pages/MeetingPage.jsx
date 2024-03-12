import React, { useEffect, useRef, useState } from "react";
const initLayoutContainer = window.initLayoutContainer;
//twyng configuration
const twyng = new window.Twyng({
  clientId: "644754e83c6374bd9ba141a6",
  apiKey: "83b78e6c50f751d2c1c6e415ef752a3b7f35ff26bc44745f5d9666df56a1d141",
  iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
});
console.log(" %c twyng status", " color: #bada55", twyng);
let joined = "pending";

export default function MeetingPage() {
  const [publishStreamId, setPublishStreamId] = useState();
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [localStream, setLocalStream] = useState([]);

  //twyng JOIN
  useEffect(() => {
    // if (joinFlag === true) {
    twyngJoin();
    // }
  }, []);

  //twyng Join and publish events
  const twyngJoin = async () => {
    const randomNumber =
      Math.floor(Math.random() * (100000 - 10000 + 1)) + 1000;
    const joinInfo = {
      roomId: "RoomA3",
      userId: randomNumber.toString() + "-" + Date.now(),
      name: "name",
      attributes: {
        name: "username",
      },
    };
    console.log("joined asasasasas", joined);
    if (joined !== "pending") return;
    joined = "connecting";
    // console.log("data for twyng Join", joinInfo);
    let result = await twyng.join(joinInfo);
    joined = "connected";
    console.log("----- joined asasasas", joined);
    // console.log("twyng joined details", result.result.streams)

    const localstream = await twyng.createMediastream({
      video: {
        source: "camera",
        resolution: {
          width: 640,
          height: 360,
        },
        frameRate: 16,
      },
      audio: "mic",
    });
    setLocalStream(localstream);
    console.log(localstream, "local stream ");
    let publish = await twyng.publish(localstream);
    console.log(publish);
    setPublishStreamId(publish.conference.userId);
  };

  //handle subscirbe
  useEffect(() => {
    twyng.addEventListener("new-publisher", handlesubscirbe);
    return () => {
      twyng.removeEventListener("new-publisher", handlesubscirbe);
    };
  }, [publishStreamId]);
  //handle subscribe event
  const handlesubscirbe = async (data) => {
    console.log("data for subscription", data.data);
    if (data.data) {
      let subscription = await twyng.subscribe(data.data);
      console.log("subscirbed data", subscription);

      setRemoteStreams((ps) => [
        ...ps,
        {
          ...subscription,
        },
      ]);
    }
  };

  useEffect(() => {
    console.log(remoteStreams, "streams data ");
    console.log(localStream.mediaStream, "streams data ");
    console.log("publishing stream id:", publishStreamId);
  }, [remoteStreams, publishStreamId, localStream]);

  return (
    <div>
 
    </div>
  );
}
