import isEqual from 'lodash/isEqual';

const removeLinkFromArray = (link, links) => links.filter((item) => !isEqual(item, link));

export default removeLinkFromArray;
