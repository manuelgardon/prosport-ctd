/* eslint-disable react/prop-types */
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share'
import { FacebookIcon, WhatsappIcon, TwitterIcon } from 'react-share'

export default function Redes({ url, titulo }) {
    return (
        <article className='flex gap-3 place-content-center mt-3'>
            <FacebookShareButton url={url} quote={titulo}>
                <div>
                    <FacebookIcon size={34} round={true} />
                    <span>Compartir en Facebook</span>
                </div>
            </FacebookShareButton>
            <WhatsappShareButton url={url} title={titulo}>
                <div>
                    <WhatsappIcon size={34} round={true} />
                    <span>Compartir en WhatsApp</span>
                </div>
            </WhatsappShareButton>
            <TwitterShareButton url={url} title={titulo}>
                <div>
                    <TwitterIcon size={34} round={true} />
                    <span>Compartir en Twitter</span>
                </div>
            </TwitterShareButton>
        </article>
    )
}