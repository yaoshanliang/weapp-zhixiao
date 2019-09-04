function t(q,qid) {
  for (var r = wx.getStorageSync(q), u = wx.getStorageSync(qid), n = {}, _ = 0; _ < r.length; _++) {
    var g = r[_];
    n[g.question_id] = g;
  }
  a["question"] = n,d["questionId"] = u;
}
var a = {
  question: {},
}
var d = {
  questionId:[]
}
var n = require("./underscore-min.js");
module.exports = {
  initQuestions: t,
  questions: a,
  questionIds:d,
  initAllQuestionFromStorage: function (q,qid) {
    t(q,qid);
  },
  getQuestionsByIds: function (t) {
    var r = a.question, o = [], s = [];
    s = n.isArray(t) ? t : t.split(",");
    for (var c = 0; c < s.length; c++) {
      var u = s[c];
      r[u] && o.push(n.clone(r[u]));
      console.log(r)
    }
    return o;
  },
}