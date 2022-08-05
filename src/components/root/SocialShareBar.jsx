import {
    EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TumblrIcon, TumblrShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton
} from "react-share";

function SocialShareBar() {
    const url = import.meta.env.VITE_CLIENT_URL
    const subject = "Find Where I Am | Online Solo-Multiplayer Game"
    const body = `I am playing "Find Where I Am". This game is amazing. You can also play it for free. Let's play together. Link:`
    const hashtag = "#findWhereIam #playFindWhereIam"
    const media = "https://i.postimg.cc/3JrjJq8V/Screenshot-2022-08-05-Find-The-Object-Online-Solo-Multiplayer-Game.png"

    return (
        <div className="fixed right-0 m-auto w-10 bg-white/70 py-2 pb-8 flex flex-col items-center justify-between gap-2 rounded-tl rounded-bl z-10 font-Saira">
            <EmailShareButton
                url={url}
                subject={subject}
                body={body}
                separator=" "
                className=""
            >
                <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton
                url={url}
                quote={body}
                hashtag={hashtag}
                className=""
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton
                url={url}
                title={subject}
                summary={body}
                source="Find Where I Am"
                className=""
            >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <PinterestShareButton
                url={url}
                description={body}
                media={media}
                className=""
            >
                <PinterestIcon size={32} round />
            </PinterestShareButton>
            <RedditShareButton
                url={url}
                title={subject}
                className=""
            >
                <RedditIcon size={32} round />
            </RedditShareButton>
            <TelegramShareButton
                url={url}
                title={subject}
                className=""
            >
                <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TumblrShareButton
                url={url}
                title={subject}
                caption={body}
                tags={["findWhereIam", "playFindWhereIam"]}
                className=""
            >
                <TumblrIcon size={32} round />
            </TumblrShareButton>
            <TwitterShareButton
                url={url}
                title={subject}
                via={body}
                hashtag={hashtag}
                className=""
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
                url={url}
                title={subject}
                className=""
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <div className="mt-8">
                <p className="-rotate-90 font-bold text-xl text-[#a60cff]">Share!</p>
            </div>
        </div>
    );
}

export default SocialShareBar;