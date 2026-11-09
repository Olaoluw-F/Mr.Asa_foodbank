/** Day keys used in site hours, Sunday first (the order of Date#getDay). */
export const DAY_NAMES = {Sun:"Sunday",Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday"}
export const DAY_KEYS = Object.keys(DAY_NAMES)

/** Today's day key, such as "Mon". */
export const getToday = () => DAY_KEYS[new Date().getDay()]
