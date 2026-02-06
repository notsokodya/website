import { useState, useEffect } from "preact/hooks";

const randomDescriptions = [
    "woof :3",
    "the silly goober",
    "sharrkss are cuuuteeee",
    "engineer gaming",
    "5g horse",
    "mrow :3",
    "lives in [the void]",
    "self-taught programmer",
    "stay hydrated",
    "sewerslvt fan",
    "pray the machine",
    "local toaster",
    "shark protogen thing",
    "demoncore production",
    "sleep deprived",
    "haiiii",
    "cynthoni fan",
    "internet creatura",
    "fish fish shark",
    "evil shark co.",
    "netwowk swipth",
    "huh",
    "\"bottom text\"",
    "industrial revolution",
    "haha open source",
    "real furry(frfr)",
    "table.shuffle(_G)",
    "tf2 gamer",
    "a fool",
    "segmentation fault",
    "██████████████████",
    "j",
    "social anxiety ;w;"
];

export default function Desc({className, ...props}) {
    const [desc, setDesc] = useState("uhhh sec");
    const [hideDesc, setHide] = useState(true);

    useEffect(() => {
        let descNum = Math.floor(Math.random() * randomDescriptions.length);
        setDesc(randomDescriptions[descNum]);
        setHide(false);

        const interval = setInterval(() => {
            setHide(true);

            setTimeout(() => {
                descNum = (descNum + 1) % randomDescriptions.length
                setDesc(randomDescriptions[descNum]);
                setHide(false);
            }, 1000);
        }, 10000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return <div className={className + (hideDesc ? " hide" : "")}{...props}>{desc}</div>
}