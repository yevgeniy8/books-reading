interface Media {
    mobile: number;
    tablet: number;
    desktop: number;
}

const media: Media = {
    mobile: 300,
    tablet: 736,
    desktop: 1280,
};

const { mobile, tablet, desktop } = media;

const min = (bp: number) => `@media screen and (min-width: ${bp}px)`;
const max = (bp: number) => `@media screen and (max-width: ${bp}px)`;

export { mobile, tablet, desktop, min, max };