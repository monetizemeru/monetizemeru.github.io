var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var ConsoleType = /* @__PURE__ */ ((ConsoleType2) => {
  ConsoleType2["ERROR"] = "error";
  ConsoleType2["WARN"] = "warn";
  ConsoleType2["INFO"] = "info";
  return ConsoleType2;
})(ConsoleType || {});
const DEFAULT_CONSOLE_TYPE = ConsoleType.INFO;
const QUERY_PARAM_NAME = "mode";
const QUERY_PARAM_VALUE = "debug";
const consoleLogger = ({ message, type }) => {
  const url = new URL(window.location.href);
  const IS_DEBUG_MODE = url.searchParams.get(QUERY_PARAM_NAME) === QUERY_PARAM_VALUE;
  if (!IS_DEBUG_MODE)
    return;
  const loggerFunc = console[type || DEFAULT_CONSOLE_TYPE];
  loggerFunc(message);
};
const SPORTS_PARTNER_STORAGE_NAME = "sports:partner:cross:domain:id";
const API = "https://recs.s5o.ru/match/";
const API_MERGE = "https://recs.s5o.ru/match/merge/";
const EVENT_NAME = "users-match";
const IFRAME_ID = "user-matcher-iframe";
const EVENT_NAME_ALREADY_MATCHED = "user-match:update:id";
const MESSAGE_NAMESPACE = "[SPORTS]:[USER-MATCHER]:";
const MESSAGE_MERGE_SUCCESS = `${MESSAGE_NAMESPACE} id \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043C\u0435\u0440\u0436\u0435\u043D\u044B`;
const MESSAGE_MERGE_FAIL = `${MESSAGE_NAMESPACE} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043Ce\u0440\u0436\u0438\u0442\u044C id \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F`;
const MESSAGE_MATCH_SUCCESS = `${MESSAGE_NAMESPACE} \u044E\u0437\u0435\u0440 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043C\u0430\u0442\u0447\u0435\u043D`;
const MESSAGE_MATCH_FAIL = `${MESSAGE_NAMESPACE} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043C\u0430\u0442\u0447\u0438\u0442\u044C \u044E\u0437\u0435\u0440\u0430:`;
class UserMatcher {
  constructor(userId, options) {
    this.uid = userId;
    this.userInfo = __spreadValues({
      domain: "sports"
    }, options);
  }
  matchUser() {
    return fetch(API, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Uid": this.uid
      },
      body: JSON.stringify(this.userInfo)
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then((res) => {
      if (res.updated || res.created) {
        consoleLogger({ message: MESSAGE_MATCH_SUCCESS });
        localStorage.setItem(SPORTS_PARTNER_STORAGE_NAME, this.uid);
        return this.uid;
      }
      return null;
    }).catch((error) => {
      consoleLogger({
        type: ConsoleType.ERROR,
        message: `${MESSAGE_MATCH_FAIL} ${error.message}`
      });
      return null;
    });
  }
  mergeUserIds({ oldUserId }) {
    return fetch(API_MERGE, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ old: oldUserId, new: this.uid })
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(() => {
      consoleLogger({ type: ConsoleType.INFO, message: MESSAGE_MERGE_SUCCESS });
    }).catch((error) => {
      consoleLogger({ type: ConsoleType.ERROR, message: `${MESSAGE_MERGE_FAIL} ${error}` });
    });
  }
}
const insertIframe = (origin) => {
  const iframe = document.createElement("iframe");
  iframe.src = origin;
  iframe.style.display = "none";
  iframe.id = IFRAME_ID;
  document.body.appendChild(iframe);
};
const removeIframe = () => {
  const iframe = document.getElementById(IFRAME_ID);
  if (iframe)
    iframe.remove();
};
class UserMatcherInitializer {
  constructor(options, iframeOrigin) {
    this.listen = (event) => {
      var _a;
      let messageData;
      try {
        messageData = JSON.parse(event.data);
      } catch (e) {
        return;
      }
      if (!messageData) {
        return;
      }
      const { userId, name, isNew: IS_NEW } = messageData;
      if (name !== EVENT_NAME || !userId)
        return;
      window.removeEventListener("message", this.listen);
      const localUserId = localStorage.getItem(SPORTS_PARTNER_STORAGE_NAME);
      const IDS_ARE_NOT_EQUAL = localUserId && localUserId !== userId;
      if (!(IDS_ARE_NOT_EQUAL && IS_NEW)) {
        removeIframe();
      }
      if (userId && localUserId === userId) {
        consoleLogger({ message: "[SPORTS]:[USER-MATCHER]: \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u0436\u0435 \u0431\u044B\u043B \u0441\u043C\u0430\u0442\u0447\u0435\u043D" });
        return this.cb(localUserId);
      }
      this.userMatcher = new UserMatcher(userId, this.options);
      if (IDS_ARE_NOT_EQUAL) {
        consoleLogger({
          message: "[SPORTS]:[USER-MATCHER]: \u0414\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0431\u044B\u043B \u0441\u043E\u0437\u0434\u0430\u043D id \u0440\u0430\u043D\u0435\u0435"
        });
        if (IS_NEW) {
          const iframe = document.getElementById(IFRAME_ID);
          if (iframe) {
            (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage(JSON.stringify({ localUserId, name: EVENT_NAME_ALREADY_MATCHED }), "*");
            return this.cb(localUserId);
          }
        }
        this.userMatcher.mergeUserIds({ oldUserId: localUserId }).then(() => {
          localStorage.setItem(SPORTS_PARTNER_STORAGE_NAME, userId);
          return this.cb(userId);
        }).catch(() => this.cb(null));
        return;
      }
      this.userMatcher.matchUser().then((id) => this.cb(id)).catch(() => this.cb(null));
    };
    this.listenForMessage = (cb) => {
      this.cb = cb;
      window.addEventListener("message", this.listen);
    };
    this.userMatcher = null;
    this.options = options;
    this.userId = null;
    this.iframeOrigin = iframeOrigin;
    this.cb = (value) => value;
    this.listen = this.listen.bind(this);
  }
  inserIframe() {
    insertIframe(this.iframeOrigin);
  }
  initUserMatcher() {
    return new Promise((resolve) => {
      this.listenForMessage(resolve);
      this.inserIframe();
    });
  }
}
const API_SEND = "https://recs.s5o.ru/send/";
const API_GET_PERSONAL_RECOMMENDATIONS = "https://recs.s5o.ru/get/";
const API_GET_PERSONAL_RECOMMENDATIONS_BY_CONFIG = "https://recs.s5o.ru/get/by_config/";
const DEFAULT_PLATFORM = "web";
const DEFAULT_ACTION_NAME = "view";
const DEFAULT_SCRIPT_NAME = "cross-domain-info";
const SENDER_EVENT_NAME = "sports:cross-recommender:sender-ready";
const ARRAY_CONTENT_REQ_KEY = "content_list";
const OBJECT_CONTENT_REQ_KEY = "content";
const HEADER_UID_PARAMETER = "X-Uid";
const HEADER_SID_PARAMETER = "X-Sid";
const MESSAGE_PREFIX = "[SPORTS]:[CROSS-RECOMMENDER]:";
const MESSAGE_SUCCESS = `${MESSAGE_PREFIX} \u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B`;
const MESSAGE_FAIL = `${MESSAGE_PREFIX} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435`;
const MESSAGE_CONTENT_FAIL = `${MESSAGE_PREFIX} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0435`;
const MESSAGE_GET_SUCCESS = `${MESSAGE_PREFIX} \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u044B`;
const MESSAGE_GET_FAIL = `${MESSAGE_PREFIX} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438:`;
const MESSAGE_PAGE_DATA_FAIL = `${MESSAGE_PREFIX} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435`;
const orginizePageData = (data) => {
  const {
    id,
    type,
    datepublished,
    url,
    datemodified,
    image,
    headline,
    articleSection,
    commentCount,
    contentRating
  } = data;
  return __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({
    id,
    type,
    ctime: datepublished,
    url
  }, datemodified ? { mtime: datemodified } : {}), image ? { image } : {}), headline ? { title: headline } : {}), articleSection ? { section: articleSection } : {}), "commentCount" in data && commentCount ? { comments: +commentCount } : {}), "contentRating" in data && contentRating ? { rate: +contentRating } : {}), {
    active: "active" in data ? data.active : true
  });
};
const collectPageData = (scriptName = DEFAULT_SCRIPT_NAME) => {
  const info = document == null ? void 0 : document.querySelector(`script[type="application/ld+json"][data-name="${scriptName}"]`);
  if (!info)
    return null;
  try {
    const data = JSON.parse(info.innerHTML);
    return orginizePageData(data);
  } catch (error) {
    consoleLogger({
      type: ConsoleType.ERROR,
      message: `${MESSAGE_PAGE_DATA_FAIL} ${String(error)}`
    });
    return null;
  }
};
const getInfo = ({ domain, uidAuth }) => {
  const info = __spreadValues({
    domain,
    platform: DEFAULT_PLATFORM,
    action: {
      name: DEFAULT_ACTION_NAME
    }
  }, uidAuth ? { uid_auth: uidAuth } : {});
  return info;
};
const extendInfo = ({ info, action }) => {
  return __spreadProps(__spreadValues({}, info), {
    action: {
      name: action
    }
  });
};
const getSuid = () => {
  var _a;
  return ((_a = window == null ? void 0 : window.SPRTS) == null ? void 0 : _a.getSessionUid) ? window.SPRTS.getSessionUid() : null;
};
const updateSuid = () => {
  var _a;
  if ((_a = window == null ? void 0 : window.SPRTS) == null ? void 0 : _a.updateSession) {
    window.SPRTS.updateSession();
  }
};
const getSender = (info, uid, isDev) => ({ content: passedPageData, content_list: contentList, scriptName, action } = {}) => {
  const content = passedPageData || contentList || collectPageData(scriptName);
  if (!content) {
    consoleLogger({ type: ConsoleType.ERROR, message: MESSAGE_CONTENT_FAIL });
    return;
  }
  const suid = getSuid();
  const infoToSend = action ? extendInfo({ info, action }) : info;
  const contentReqKey = Array.isArray(content) ? ARRAY_CONTENT_REQ_KEY : OBJECT_CONTENT_REQ_KEY;
  const data = JSON.stringify(__spreadProps(__spreadValues({}, infoToSend), {
    uid,
    [contentReqKey]: content,
    dev: isDev
  }));
  updateSuid();
  if (!navigator.sendBeacon || suid) {
    const headers = {
      "Content-Type": "application/json",
      [HEADER_UID_PARAMETER]: uid
    };
    if (suid) {
      headers[HEADER_SID_PARAMETER] = suid;
    }
    return fetch(API_SEND, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers,
      body: data
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(() => {
      consoleLogger({ type: ConsoleType.INFO, message: MESSAGE_SUCCESS });
    }).catch((error) => {
      consoleLogger({ type: ConsoleType.ERROR, message: `${MESSAGE_FAIL} ${error}` });
    });
  } else {
    const blob = new Blob([data], {
      type: "application/json"
    });
    const RESULT = navigator.sendBeacon(API_SEND, blob);
    if (RESULT) {
      consoleLogger({ type: ConsoleType.INFO, message: MESSAGE_SUCCESS });
    } else {
      consoleLogger({ type: ConsoleType.INFO, message: MESSAGE_SUCCESS });
    }
    return RESULT;
  }
};
const setSender = (info, uid, isDev) => {
  window.SPRTS = window.SPRTS || {};
  window.SPRTS.sendDataForRecommender = getSender(info, uid, isDev);
};
const getData = ({ filter, count, top, sort, model, domain, pagination, config }) => {
  const manualConfigParams = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, filter ? { filter } : {}), model ? { model } : {}), count ? { count } : {}), top ? { top } : {}), sort ? { sort } : {});
  return __spreadValues({
    domain,
    pagination
  }, config ? { config } : manualConfigParams);
};
const getPersonalRecommendationsGetter = (domain, uid) => (payload = {}) => {
  let senderPagination = null;
  if (payload.pagination && !senderPagination) {
    senderPagination = {};
  }
  const suid = getSuid();
  const data = getData(__spreadProps(__spreadValues({}, payload), { domain, pagination: senderPagination }));
  const apiUrl = data.config ? API_GET_PERSONAL_RECOMMENDATIONS_BY_CONFIG : API_GET_PERSONAL_RECOMMENDATIONS;
  const headers = {
    "Content-Type": "application/json",
    [HEADER_UID_PARAMETER]: uid
  };
  if (suid) {
    headers[HEADER_SID_PARAMETER] = suid;
  }
  updateSuid();
  return fetch(apiUrl, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers,
    body: JSON.stringify(data)
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then((res) => {
    const pagination = res.pagination;
    if (pagination) {
      senderPagination = __spreadProps(__spreadValues({}, pagination), {
        page: pagination.page + 1
      });
    }
    consoleLogger({
      type: ConsoleType.INFO,
      message: MESSAGE_GET_SUCCESS
    });
    return res;
  }).catch((error) => {
    consoleLogger({
      type: ConsoleType.ERROR,
      message: `${MESSAGE_GET_FAIL} ${String(error)}`
    });
  });
};
const setRecommendationsGetter = (domain, uid) => {
  window.SPRTS = window.SPRTS || {};
  window.SPRTS.getPersonalRecs = getPersonalRecommendationsGetter(domain, uid);
};
const setAnalyticsSender = (info, uid, isDev) => {
  window.SPRTS = window.SPRTS || {};
  window.SPRTS.sendAnalytics = getSender(info, uid, isDev);
};
const onMatcherIsReady = ({ uid, domain, uidAuth, isDev = false }) => {
  const info = getInfo({ domain, uidAuth });
  setSender(info, uid, isDev);
  setRecommendationsGetter(domain, uid);
  setAnalyticsSender(info, uid, isDev);
  const notification = new CustomEvent(SENDER_EVENT_NAME);
  window.dispatchEvent(notification);
};
const initRecommender = (iframeOrigin) => ({ domain, partner, uidAuth, isDev = false }) => {
  const matcher = new UserMatcherInitializer({ partner }, iframeOrigin);
  matcher.initUserMatcher().then((uid) => {
    if (!uid) {
      return;
    }
    onMatcherIsReady({ uid, domain, uidAuth, isDev });
  }).catch(() => {
  });
};
const setInitRecommender = (iframeOrigin) => {
  window.SPRTS = window.SPRTS || {};
  window.SPRTS.initRecommender = initRecommender(iframeOrigin);
  window.SPRTS.senderEventName = SENDER_EVENT_NAME;
};
const initQueue = () => {
  window.SPRTS = window.SPRTS || {};
  window.SPRTS.q = window.SPRTS.q || [];
  const queue = window.SPRTS.q;
  queue.push = (cb) => {
    if (typeof cb === "function") {
      cb();
    }
    return queue.length;
  };
  queue.forEach((cb) => {
    if (typeof cb === "function") {
      cb();
    }
  });
};
const ORIGIN = `${"https://senoval.sports.ru/cross-recommender/"}iframe.html`;
setInitRecommender(ORIGIN);
initQueue();
