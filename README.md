## Features
Hangouts-chat-bot

## Usage
<p>Input Parameters:
    <ul>
        <li><b>Content</b> - The content message that users want to send in hangouts-chat <b>Content</b> property or the <code>msg.payload</code> property</li>
    </ul>
</p>
<p>Return values:
    <ul>
        <li><b>payload</b> Will show link to room chat or provide an error state</li>
    </ul>
</p>

<p>Set content "This is a data sensor"</p>

![hangout-node1](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-hangouts-chat-bot/source/image/hangout-node1.png)

<p>Press node injects to run the node. After success, copy link result to open room chat.</p>

![hangout-node2](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-hangouts-chat-bot/source/image/hangout-node2.png)

<p>In hangout chat</p>

![hangout-bot](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-hangouts-chat-bot/source/image/hangout-bot.png)

``` node
[{"id":"885a65c2.ee0ff8","type":"inject","z":"947fa281.a6e48","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":220,"wires":[["224bab51.cedcd4"]]},{"id":"f7259a32.043568","type":"debug","z":"947fa281.a6e48","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":730,"y":220,"wires":[]},{"id":"224bab51.cedcd4","type":"hangoutChatBot","z":"947fa281.a6e48","hangoutsCertificate":"54da3398.354dfc","roomproperty":"AAAALmeclyU","roomtype":"str","contentproperty":"This is my test","contenttype":"str","x":460,"y":220,"wires":[["f7259a32.043568"]]},{"id":"54da3398.354dfc","type":"hangoutsCertificate","z":"","clientEmail":"","privateKey":""}]
```

## Guideline
<a href="https://github.com/taminhhienmor/node-red-contrib-hangouts-chat-bot/tree/master/source/docs/hangouts-chat-guideline-v0.0.5.docx">Guideline to use node and get keys</a>

## Reference
<a href="https://flows.nodered.org/node/node-red-contrib-hangouts-chat">node-red-contrib-hangouts-bot</a>