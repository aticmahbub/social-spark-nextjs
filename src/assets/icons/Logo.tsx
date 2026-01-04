import siteIcon from './site-icon.png';

import Image from 'next/image';

export default function Logo() {
    return (
        <Image height={40} width={40} src={siteIcon} alt='Social Spark Logo' />
    );
}
