import isEqual from 'lodash.isequal';

const removeLinkFromArray = (link, links) => links.filter((item) => !isEqual(item, link));

export default removeLinkFromArray;
