import babelJest from 'babel-jest';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
export function process(src, filename) {
	if (filename.match(/\.(css|less|scss|styl|sss)$/)) {
		return '';
	}

	return babelJest.process(src, filename);
}
