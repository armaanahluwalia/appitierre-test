import { difference } from 'lodash';
import { items } from './config';

const appState = {};

/** 
 * Helper function to format a link. Runs the condition 
 * for the given link id and return a formatted string.
 * @param linkNo - A string id for the link
 * @param selected - An array of currently selected ids
**/
const getLink = (linkNo, selected) => {
    const condition = selectedMap[linkNo];
    let showLink = false;
    if (typeof condition === "function") {
        showLink = condition(selected);
    } else if (Array.isArray(condition)) {
        showLink = difference(condition, selected).length === 0;
    }
    return showLink ? '#' : '';
};

/** 
 * The reference map to check the state of a link against
 * Can be either an array or a function.
**/

const selectedMap = {
    "1": [1],
    "2": [3,5],
    "3": items.map(linkNo => parseInt(linkNo)),
    "4": (selected) => {
        return Boolean(selected.length === 0);
    },
    "5": items.filter(linkNo => Boolean(linkNo % 2)),
    "6": items.filter(linkNo => Boolean(!(linkNo % 2))),
    "7": (selected) => {
        return Boolean(selected.length);
    }
};

/** 
 * Simple store constructor
 * @prop id - An id for the checkbox
**/
const Store = () => {
    return {
        get: (key) => {
            if(!key) {
                return appState;
            }
            return appState[key];
        },
        set: (key, value) => {
            if(key === 'selectedItems') {
                appState[key] = value;
                appState['links'] = items
                    .map(itemNo => {
                        return {
                            id: itemNo,
                            href: getLink(itemNo, [...value]) 
                        };
                    });
            }
        }
    }

};

export default Store;