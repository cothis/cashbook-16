import html from '../../core/jsx';
interface FCPropTypes {}

type FC<P extends FCPropTypes = FCPropTypes> = (prop?: P) => HTMLElement;

export { html, FCPropTypes };
export default FC;
