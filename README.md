## Features
Hangouts-chat-sensor

## Usage
<p>Input Parameters:
    <ul>
        <li><b>Key</b> - The key in hangouts-chat <b>Key</b> property or the <code>msg.[key]</code> property</li>
        <li><b>Room</b> - The room in hangouts-chat <b>Key</b> property or the <code>msg.[room]</code> property</li>
        <li><b>Content</b> - The content message that users want to send in hangouts-chat <b>Key</b> property or the <code>msg.[content]</code> property</li>
    </ul>
</p>
<p>Return values:
    <ul>
        <li><b>payload</b> Will content sent or provide an error state</li>
    </ul>
</p>
![colorCircle](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-hangouts-chat-sensor/source/image/hangouts_demo.png)
``` node
[{"id":"885a65c2.ee0ff8","type":"inject","z":"947fa281.a6e48","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":200,"wires":[["21345517.d2811a"]]},{"id":"f7259a32.043568","type":"debug","z":"947fa281.a6e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":750,"y":200,"wires":[]},{"id":"21345517.d2811a","type":"hangoutSensor","z":"947fa281.a6e48","keyproperty":"key","keytype":"msg","roomproperty":"room","roomtype":"msg","contentproperty":"content","contenttype":"msg","x":540,"y":200,"wires":[["f7259a32.043568"]]}]
```

## Reference
<a href="https://flows.nodered.org/node/node-red-contrib-hangouts-chat">node-red-contrib-hangouts-chat</a>