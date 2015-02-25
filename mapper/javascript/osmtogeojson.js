!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define([], e); else {
        var n;
        "undefined" != typeof window ? n = window : "undefined" != typeof global ? n = global : "undefined" != typeof self && (n = self), n.osmtogeojson = e()
    }
}(function () {
    return function e(n, t, r) {
        function o(i, s) {
            if (!t[i]) {
                if (!n[i]) {
                    var u = "function" == typeof require && require;
                    if (!s && u)return u(i, !0);
                    if (a)return a(i, !0);
                    var l = new Error("Cannot find module '" + i + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var c = t[i] = {exports: {}};
                n[i][0].call(c.exports, function (e) {
                    var t = n[i][1][e];
                    return o(t ? t : e)
                }, c, c.exports, e, n, t, r)
            }
            return t[i].exports
        }

        for (var a = "function" == typeof require && require, i = 0; i < r.length; i++)o(r[i]);
        return o
    }({
        1: [function (e, n) {
            var t = e("./lodash.custom.js"), r = e("geojson-rewind"), o = e("./polygon_features.json"), a = {};
            a = function (e, n) {
                function a(e) {
                    function n(e) {
                        var n = t.clone(e);
                        n.lat = e.center.lat, n.lon = e.center.lon, n.__is_center_placeholder = !0, i.push(n)
                    }

                    function r(e) {
                        function n(e, n, t) {
                            var o = {type: "node", id: "_" + r.type + "/" + r.id + "bounds" + t, lat: e, lon: n};
                            r.nodes.push(o.id), i.push(o)
                        }

                        var r = t.clone(e);
                        r.nodes = [], n(r.bounds.minlat, r.bounds.minlon, 1), n(r.bounds.maxlat, r.bounds.minlon, 2), n(r.bounds.maxlat, r.bounds.maxlon, 3), n(r.bounds.minlat, r.bounds.maxlon, 4), r.nodes.push(r.nodes[0]), r.__is_bounds_placeholder = !0, u.push(r)
                    }

                    function o(e) {
                        function n(e, n, t) {
                            var r = {type: "node", id: t, lat: e, lon: n, __is_uninteresting: !0};
                            i.push(r)
                        }

                        t.isArray(e.nodes) || (e.nodes = e.geometry.map(function (e) {
                            return null !== e ? "_anonymous@" + e.lat + "/" + e.lon : "_anonymous@unknown_location"
                        })), e.geometry.forEach(function (t, r) {
                            t && n(t.lat, t.lon, e.nodes[r])
                        })
                    }

                    function a(e) {
                        function n(e, n, t) {
                            var r = {type: "node", id: t, lat: e, lon: n};
                            i.push(r)
                        }

                        function t(e, n) {
                            function t(e, n) {
                                var t = {
                                    type: "node",
                                    id: "_anonymous@" + e + "/" + n,
                                    lat: e,
                                    lon: n,
                                    __is_uninteresting: !0
                                };
                                r.nodes.push(t.id), i.push(t)
                            }

                            if (!u.some(function (e) {
                                    return "way" == e.type && e.id == n
                                })) {
                                var r = {type: "way", id: n, nodes: []};
                                e.forEach(function (e) {
                                    e ? t(e.lat, e.lon) : r.nodes.push(void 0)
                                }), u.push(r)
                            }
                        }

                        e.members.forEach(function (e) {
                            "node" == e.type ? e.lat && n(e.lat, e.lon, e.ref) : "way" == e.type && e.geometry && t(e.geometry, e.ref)
                        })
                    }

                    for (var i = new Array, u = new Array, l = new Array, c = 0; c < e.elements.length; c++)switch (e.elements[c].type) {
                        case"node":
                            var f = e.elements[c];
                            i.push(f);
                            break;
                        case"way":
                            var p = t.clone(e.elements[c]);
                            p.nodes = t.clone(p.nodes), u.push(p), p.center && n(p), p.geometry ? o(p) : p.bounds && r(p);
                            break;
                        case"relation":
                            var d = t.clone(e.elements[c]);
                            d.members = t.clone(d.members), l.push(d);
                            var g = d.members && d.members.some(function (e) {
                                    return "node" == e.type && e.lat || "way" == e.type && e.geometry && e.geometry.length > 0
                                });
                            d.center && n(d), g ? a(d) : d.bounds && r(d)
                    }
                    return s(i, u, l)
                }

                function i(e) {
                    function n(e, n, t) {
                        e.hasAttribute(t) && (n[t] = e.getAttribute(t))
                    }

                    function r(e, r) {
                        var o = t.clone(e);
                        n(r, o, "lat"), n(r, o, "lon"), o.__is_center_placeholder = !0, u.push(o)
                    }

                    function o(e, n) {
                        function r(e, n, t) {
                            var r = {type: "node", id: "_" + o.type + "/" + o.id + "bounds" + t, lat: e, lon: n};
                            o.nodes.push(r.id), u.push(r)
                        }

                        var o = t.clone(e);
                        o.nodes = [], r(n.getAttribute("minlat"), n.getAttribute("minlon"), 1), r(n.getAttribute("maxlat"), n.getAttribute("minlon"), 2), r(n.getAttribute("maxlat"), n.getAttribute("maxlon"), 3), r(n.getAttribute("minlat"), n.getAttribute("maxlon"), 4), o.nodes.push(o.nodes[0]), o.__is_bounds_placeholder = !0, l.push(o)
                    }

                    function a(e, n) {
                        function r(e, n, t) {
                            var r = {type: "node", id: t, lat: e, lon: n, __is_uninteresting: !0};
                            return u.push(r), r.id
                        }

                        t.isArray(e.nodes) || (e.nodes = [], t.each(n, function (n) {
                            e.nodes.push("_anonymous@" + n.getAttribute("lat") + "/" + n.getAttribute("lon"))
                        })), t.each(n, function (n, t) {
                            n.getAttribute("lat") && r(n.getAttribute("lat"), n.getAttribute("lon"), e.nodes[t])
                        })
                    }

                    function i(e, n) {
                        function r(e, n, t) {
                            var r = {type: "node", id: t, lat: e, lon: n};
                            u.push(r)
                        }

                        function o(e, n) {
                            function r(e, n) {
                                var t = {
                                    type: "node",
                                    id: "_anonymous@" + e + "/" + n,
                                    lat: e,
                                    lon: n,
                                    __is_uninteresting: !0
                                };
                                o.nodes.push(t.id), u.push(t)
                            }

                            if (!l.some(function (e) {
                                    return "way" == e.type && e.id == n
                                })) {
                                var o = {type: "way", id: n, nodes: []};
                                t.each(e, function (e) {
                                    e.getAttribute("lat") ? r(e.getAttribute("lat"), e.getAttribute("lon")) : o.nodes.push(void 0)
                                }), l.push(o)
                            }
                        }

                        t.each(n, function (n, t) {
                            "node" == e.members[t].type ? n.getAttribute("lat") && r(n.getAttribute("lat"), n.getAttribute("lon"), e.members[t].ref) : "way" == e.members[t].type && n.getElementsByTagName("nd").length > 0 && o(n.getElementsByTagName("nd"), e.members[t].ref)
                        })
                    }

                    var u = new Array, l = new Array, c = new Array;
                    t.each(e.getElementsByTagName("node"), function (e) {
                        var r = {};
                        t.each(e.getElementsByTagName("tag"), function (e) {
                            r[e.getAttribute("k")] = e.getAttribute("v")
                        });
                        var o = {type: "node"};
                        n(e, o, "id"), n(e, o, "lat"), n(e, o, "lon"), n(e, o, "version"), n(e, o, "timestamp"), n(e, o, "changeset"), n(e, o, "uid"), n(e, o, "user"), t.isEmpty(r) || (o.tags = r), u.push(o)
                    });
                    var f, p;
                    return t.each(e.getElementsByTagName("way"), function (e) {
                        var i = {}, s = [];
                        t.each(e.getElementsByTagName("tag"), function (e) {
                            i[e.getAttribute("k")] = e.getAttribute("v")
                        });
                        var u = !1;
                        t.each(e.getElementsByTagName("nd"), function (e, n) {
                            var t;
                            (t = e.getAttribute("ref")) && (s[n] = t), !u && e.getAttribute("lat") && (u = !0)
                        });
                        var c = {type: "way"};
                        n(e, c, "id"), n(e, c, "version"), n(e, c, "timestamp"), n(e, c, "changeset"), n(e, c, "uid"), n(e, c, "user"), s.length > 0 && (c.nodes = s), t.isEmpty(i) || (c.tags = i), (f = e.getElementsByTagName("center")[0]) && r(c, f), u ? a(c, e.getElementsByTagName("nd")) : (p = e.getElementsByTagName("bounds")[0]) && o(c, p), l.push(c)
                    }), t.each(e.getElementsByTagName("relation"), function (e) {
                        var a = {}, s = [];
                        t.each(e.getElementsByTagName("tag"), function (e) {
                            a[e.getAttribute("k")] = e.getAttribute("v")
                        });
                        var u = !1;
                        t.each(e.getElementsByTagName("member"), function (e, t) {
                            s[t] = {}, n(e, s[t], "ref"), n(e, s[t], "role"), n(e, s[t], "type"), (!u && "node" == s[t].type && e.getAttribute("lat") || "way" == s[t].type && e.getElementsByTagName("nd").length > 0) && (u = !0)
                        });
                        var l = {type: "relation"};
                        n(e, l, "id"), n(e, l, "version"), n(e, l, "timestamp"), n(e, l, "changeset"), n(e, l, "uid"), n(e, l, "user"), s.length > 0 && (l.members = s), t.isEmpty(a) || (l.tags = a), (f = e.getElementsByTagName("center")[0]) && r(l, f), u ? i(l, e.getElementsByTagName("member")) : (p = e.getElementsByTagName("bounds")[0]) && o(l, p), c.push(l)
                    }), s(u, l, c)
                }

                function s(e, o, a) {
                    function i(e, t) {
                        if ("object" != typeof t && (t = {}), "function" == typeof n.uninterestingTags)return !n.uninterestingTags(e, t);
                        for (var r in e)if (n.uninterestingTags[r] !== !0 && t[r] !== !0 && t[r] !== e[r])return !0;
                        return !1
                    }

                    function s(e) {
                        var n = {
                            timestamp: e.timestamp,
                            version: e.version,
                            changeset: e.changeset,
                            user: e.user,
                            uid: e.uid
                        };
                        for (k in n)void 0 === n[k] && delete n[k];
                        return n
                    }

                    function l(e, r) {
                        function o(t) {
                            for (var r, o, a, i, s, u, c = function (e) {
                                return e[0]
                            }, f = function (e) {
                                return e[e.length - 1]
                            }, p = []; t.length;)for (r = t.pop().nodes.slice(), p.push(r); t.length && c(r) !== f(r);) {
                                for (o = c(r), a = f(r), i = 0; i < t.length; i++) {
                                    if (u = t[i].nodes, a === c(u)) {
                                        s = r.push, u = u.slice(1);
                                        break
                                    }
                                    if (a === f(u)) {
                                        s = r.push, u = u.slice(0, -1).reverse();
                                        break
                                    }
                                    if (o == f(u)) {
                                        s = r.unshift, u = u.slice(0, -1);
                                        break
                                    }
                                    if (o == c(u)) {
                                        s = r.unshift, u = u.slice(1).reverse();
                                        break
                                    }
                                    u = s = null
                                }
                                if (!u) {
                                    n.verbose && console.warn("Multipolygon", l + "/" + e.id, "contains unclosed ring geometry");
                                    break
                                }
                                t.splice(i, 1), s.apply(r, u)
                            }
                            return p
                        }

                        function a(e) {
                            var n, t, r = function (e, n) {
                                for (var t = 0; t < n.length; t++)if (a(n[t], e))return !0;
                                return !1
                            }, o = function (e) {
                                return e.map(function (e) {
                                    return [+e.lat, +e.lon]
                                })
                            }, a = function (e, n) {
                                for (var t = e[0], r = e[1], o = !1, a = 0, i = n.length - 1; a < n.length; i = a++) {
                                    var s = n[a][0], u = n[a][1], l = n[i][0], c = n[i][1], f = u > r != c > r && (l - s) * (r - u) / (c - u) + s > t;
                                    f && (o = !o)
                                }
                                return o
                            };
                            for (e = o(e), n = 0; n < c.length; n++)if (t = o(c[n]), r(t, e))return n
                        }

                        var i, u = !1, l = T ? "way" : "relation";
                        i = r.members.filter(function (e) {
                            return "way" === e.type
                        }), i = i.map(function (t) {
                            var r = g[t.ref];
                            return void 0 === r ? (n.verbose && console.warn("Multipolygon", l + "/" + e.id, "tainted by a missing way", t.type + "/" + t.ref), void(u = !0)) : {
                                id: t.ref,
                                role: t.role || "outer",
                                way: r,
                                nodes: r.nodes.filter(function (r) {
                                    return void 0 !== r ? !0 : (u = !0, n.verbose && console.warn("Multipolygon", l + "/" + e.id, "tainted by a way", t.type + "/" + t.ref, "with a missing node"), !1)
                                })
                            }
                        }), i = t.compact(i);
                        var c, f;
                        c = o(i.filter(function (e) {
                            return "outer" === e.role
                        })), f = o(i.filter(function (e) {
                            return "inner" === e.role
                        }));
                        var p;
                        p = c.map(function (e) {
                            return [e]
                        });
                        for (var d = 0; d < f.length; d++) {
                            var y = a(f[d]);
                            void 0 !== y ? p[y].push(f[d]) : n.verbose && console.warn("Multipolygon", l + "/" + e.id, "contains an inner ring with no containing outer")
                        }
                        var m = [];
                        if (m = t.compact(p.map(function (r) {
                                var o = t.compact(r.map(function (r) {
                                    return r.length < 4 ? void(n.verbose && console.warn("Multipolygon", l + "/" + e.id, "contains a ring with less than four nodes")) : t.compact(r.map(function (e) {
                                        return [+e.lon, +e.lat]
                                    }))
                                }));
                                return 0 == o.length ? void(n.verbose && console.warn("Multipolygon", l + "/" + e.id, "contains an empty ring cluster")) : o
                            })), 0 == m.length)return n.verbose && console.warn("Multipolygon", l + "/" + e.id, "contains no coordinates"), !1;
                        var b = "MultiPolygon";
                        1 === m.length && (b = "Polygon", m = m[0]);
                        var v = {
                            type: "Feature",
                            id: e.type + "/" + e.id,
                            properties: {
                                type: e.type,
                                id: e.id,
                                tags: e.tags || {},
                                relations: h[e.type][e.id] || [],
                                meta: s(e)
                            },
                            geometry: {type: b, coordinates: m}
                        };
                        return u && (n.verbose && console.warn("Multipolygon", l + "/" + e.id, "is tainted"), v.properties.tainted = !0), v
                    }

                    for (var c = new Object, f = 0; f < e.length; f++)void 0 !== e[f].lat ? c[e[f].id] = e[f] : n.verbose && console.warn("Node", e[f].type + "/" + e[f].id, "ignored because it has no coordinates");
                    for (var p = new Object, f = 0; f < e.length; f++)"undefined" != typeof e[f].tags && i(e[f].tags) && (p[e[f].id] = !0);
                    for (var f = 0; f < a.length; f++)if (t.isArray(a[f].members))for (var d = 0; d < a[f].members.length; d++)"node" == a[f].members[d].type && (p[a[f].members[d].ref] = !0); else n.verbose && console.warn("Relation", a[f].type + "/" + a[f].id, "ignored because it has no members");
                    for (var g = new Object, y = new Object, f = 0; f < o.length; f++)if (t.isArray(o[f].nodes)) {
                        g[o[f].id] = o[f];
                        for (var d = 0; d < o[f].nodes.length; d++)y[o[f].nodes[d]] = !0, o[f].nodes[d] = c[o[f].nodes[d]]
                    } else n.verbose && console.warn("Way", o[f].type + "/" + o[f].id, "ignored because it has no nodes");
                    for (var m = new Array, f = 0; f < e.length; f++)y[e[f].id] && !p[e[f].id] || e[f].__is_uninteresting || m.push(e[f]);
                    for (var b = new Array, f = 0; f < a.length; f++)t.isArray(a[f].members) ? b[a[f].id] = a[f] : n.verbose && console.warn("Relation", a[f].type + "/" + a[f].id, "ignored because it has no members");
                    for (var h = {
                        node: {},
                        way: {},
                        relation: {}
                    }, f = 0; f < a.length; f++)if (t.isArray(a[f].members))for (var d = 0; d < a[f].members.length; d++) {
                        var v;
                        switch (a[f].members[d].type) {
                            case"node":
                                v = c[a[f].members[d].ref];
                                break;
                            case"way":
                                v = g[a[f].members[d].ref];
                                break;
                            case"relation":
                                v = b[a[f].members[d].ref]
                        }
                        if (v) {
                            var w = a[f].members[d].type, _ = a[f].members[d].ref;
                            "undefined" == typeof h[w][_] && (h[w][_] = []), h[w][_].push({
                                role: a[f].members[d].role,
                                rel: a[f].id,
                                reltags: a[f].tags
                            })
                        } else n.verbose && console.warn("Relation", a[f].type + "/" + a[f].id, "member", a[f].members[d].type + "/" + a[f].members[d].id, "ignored because it has an invalid type")
                    } else n.verbose && console.warn("Relation", a[f].type + "/" + a[f].id, "ignored because it has no members");
                    var x, A = {type: "FeatureCollection", features: new Array};
                    for (f = 0; f < m.length; f++)if ("undefined" != typeof m[f].lon && "undefined" != typeof m[f].lat) {
                        var j = {
                            type: "Feature",
                            id: m[f].type + "/" + m[f].id,
                            properties: {
                                type: m[f].type,
                                id: m[f].id,
                                tags: m[f].tags || {},
                                relations: h.node[m[f].id] || [],
                                meta: s(m[f])
                            },
                            geometry: {type: "Point", coordinates: [+m[f].lon, +m[f].lat]}
                        };
                        m[f].__is_center_placeholder && (j.properties.geometry = "center"), A.features.push(j)
                    } else n.verbose && console.warn("POI", m[f].type + "/" + m[f].id, "ignored because it lacks coordinates");
                    for (var E = {type: "FeatureCollection", features: new Array}, P = {
                        type: "FeatureCollection",
                        features: new Array
                    }, f = 0; f < a.length; f++)if ("undefined" != typeof a[f].tags && ("multipolygon" == a[f].tags.type || "boundary" == a[f].tags.type)) {
                        if (!t.isArray(a[f].members)) {
                            n.verbose && console.warn("Multipolygon", a[f].type + "/" + a[f].id, "ignored because it has no members");
                            continue
                        }
                        for (var O = 0, d = 0; d < a[f].members.length; d++)"outer" == a[f].members[d].role ? O++ : n.verbose && "inner" != a[f].members[d].role && console.warn("Multipolygon", a[f].type + "/" + a[f].id, "member", a[f].members[d].type + "/" + a[f].members[d].ref, 'ignored because it has an invalid role: "' + a[f].members[d].role + '"');
                        if (a[f].members.forEach(function (e) {
                                g[e.ref] && ("outer" !== e.role || i(g[e.ref].tags, a[f].tags) || (g[e.ref].is_multipolygon_outline = !0), "inner" !== e.role || i(g[e.ref].tags) || (g[e.ref].is_multipolygon_outline = !0))
                            }), 0 == O) {
                            n.verbose && console.warn("Multipolygon relation", a[f].type + "/" + a[f].id, "ignored because it has no outer ways");
                            continue
                        }
                        var T = !1;
                        1 != O || i(a[f].tags, {type: !0}) || (T = !0);
                        var j = null;
                        if (T) {
                            var N = a[f].members.filter(function (e) {
                                return "outer" === e.role
                            })[0];
                            if (N = g[N.ref], void 0 === N) {
                                n.verbose && console.warn("Multipolygon relation", a[f].type + "/" + a[f].id, "ignored because outer way", N.type + "/" + N.ref, "is missing");
                                continue
                            }
                            N.is_multipolygon_outline = !0, j = l(N, a[f])
                        } else j = l(a[f], a[f]);
                        if (j === !1) {
                            n.verbose && console.warn("Multipolygon relation", a[f].type + "/" + a[f].id, "ignored because it has invalid geometry");
                            continue
                        }
                        P.features.push(j)
                    }
                    for (var f = 0; f < o.length; f++)if (t.isArray(o[f].nodes)) {
                        if (!o[f].is_multipolygon_outline) {
                            for (o[f].tainted = !1, o[f].hidden = !1, coords = new Array, d = 0; d < o[f].nodes.length; d++)"object" == typeof o[f].nodes[d] ? coords.push([+o[f].nodes[d].lon, +o[f].nodes[d].lat]) : (n.verbose && console.warn("Way", o[f].type + "/" + o[f].id, "is tainted by an invalid node"), o[f].tainted = !0);
                            if (coords.length <= 1)n.verbose && console.warn("Way", o[f].type + "/" + o[f].id, "ignored because it contains too few nodes"); else {
                                var S = "LineString";
                                "undefined" != typeof o[f].nodes[0] && o[f].nodes[0] === o[f].nodes[o[f].nodes.length - 1] && ("undefined" != typeof o[f].tags && u(o[f].tags) || o[f].__is_bounds_placeholder) && (S = "Polygon", coords = [coords]);
                                var j = {
                                    type: "Feature",
                                    id: o[f].type + "/" + o[f].id,
                                    properties: {
                                        type: o[f].type,
                                        id: o[f].id,
                                        tags: o[f].tags || {},
                                        relations: h.way[o[f].id] || [],
                                        meta: s(o[f])
                                    },
                                    geometry: {type: S, coordinates: coords}
                                };
                                o[f].tainted && (n.verbose && console.warn("Way", o[f].type + "/" + o[f].id, "is tainted"), j.properties.tainted = !0), o[f].__is_bounds_placeholder && (j.properties.geometry = "bounds"), "LineString" == S ? E.features.push(j) : P.features.push(j)
                            }
                        }
                    } else n.verbose && console.warn("Way", o[f].type + "/" + o[f].id, "ignored because it has no nodes");
                    return x = {
                        type: "FeatureCollection",
                        features: []
                    }, x.features = x.features.concat(P.features), x.features = x.features.concat(E.features), x.features = x.features.concat(A.features), n.flatProperties && x.features.forEach(function (e) {
                        e.properties = t.merge(e.properties.meta, e.properties.tags, {id: e.properties.type + "/" + e.properties.id})
                    }), x = r(x, !0)
                }

                function u(e) {
                    var t = n.polygonFeatures;
                    if ("function" == typeof t)return t(e);
                    if ("no" === e.area)return !1;
                    for (var r in e) {
                        var o = e[r], a = t[r];
                        if ("undefined" != typeof a && "no" !== o) {
                            if (a === !0)return !0;
                            if (a.included_values && a.included_values[o] === !0)return !0;
                            if (a.excluded_values && a.excluded_values[o] !== !0)return !0
                        }
                    }
                    return !1
                }

                n = t.merge({
                    verbose: !1,
                    flatProperties: !1,
                    uninterestingTags: {
                        source: !0,
                        source_ref: !0,
                        "source:ref": !0,
                        history: !0,
                        attribution: !0,
                        created_by: !0,
                        "tiger:county": !0,
                        "tiger:tlid": !0,
                        "tiger:upload_uuid": !0
                    },
                    polygonFeatures: o
                }, n);
                var l;
                return l = "undefined" != typeof XMLDocument && e instanceof XMLDocument || "undefined" == typeof XMLDocument && e.childNodes ? i(e) : a(e)
            }, a.toGeojson = a, n.exports = a
        }, {"./lodash.custom.js": 2, "./polygon_features.json": 6, "geojson-rewind": 3}], 2: [function (e, n, t) {
            (function (e) {
                (function () {
                    function r() {
                        return S.pop() || []
                    }

                    function o(e) {
                        return "function" != typeof e.toString && "string" == typeof(e + "")
                    }

                    function a(e) {
                        e.length = 0, S.length < M && S.push(e)
                    }

                    function i(e, n, t) {
                        n || (n = 0), "undefined" == typeof t && (t = e ? e.length : 0);
                        for (var r = -1, o = t - n || 0, a = Array(0 > o ? 0 : o); ++r < o;)a[r] = e[n + r];
                        return a
                    }

                    function s() {
                    }

                    function u(e) {
                        function n() {
                            if (r) {
                                var e = i(r);
                                dn.apply(e, arguments)
                            }
                            if (this instanceof n) {
                                var a = c(t.prototype), s = t.apply(a, e || arguments);
                                return x(s) ? s : a
                            }
                            return t.apply(o, e || arguments)
                        }

                        var t = e[0], r = e[2], o = e[4];
                        return jn(n, e), n
                    }

                    function l(e, n, t, s, u) {
                        if (t) {
                            var c = t(e);
                            if ("undefined" != typeof c)return c
                        }
                        var f = x(e);
                        if (!f)return e;
                        var p = un.call(e);
                        if (!z[p] || !xn.nodeClass && o(e))return e;
                        var d = wn[p];
                        switch (p) {
                            case H:
                            case U:
                                return new d(+e);
                            case $:
                            case V:
                                return new d(e);
                            case G:
                                return c = d(e.source, L.exec(e)), c.lastIndex = e.lastIndex, c
                        }
                        var g = En(e);
                        if (n) {
                            var y = !s;
                            s || (s = r()), u || (u = r());
                            for (var m = s.length; m--;)if (s[m] == e)return u[m];
                            c = g ? d(e.length) : {}
                        } else c = g ? i(e) : Cn({}, e);
                        return g && (pn.call(e, "index") && (c.index = e.index), pn.call(e, "input") && (c.input = e.input)), n ? (s.push(e), u.push(c), (g ? Sn : Ln)(e, function (e, r) {
                            c[r] = l(e, n, t, s, u)
                        }), y && (a(s), a(u)), c) : c
                    }

                    function c(e) {
                        return x(e) ? bn(e) : {}
                    }

                    function f(e, n, t) {
                        if ("function" != typeof e)return T;
                        if ("undefined" == typeof n || !("prototype"in e))return e;
                        var r = e.__bindData__;
                        if ("undefined" == typeof r && (xn.funcNames && (r = !e.name), r = r || !xn.funcDecomp, !r)) {
                            var o = cn.call(e);
                            xn.funcNames || (r = !B.test(o)), r || (r = F.test(o), jn(e, r))
                        }
                        if (r === !1 || r !== !0 && 1 & r[1])return e;
                        switch (t) {
                            case 1:
                                return function (t) {
                                    return e.call(n, t)
                                };
                            case 2:
                                return function (t, r) {
                                    return e.call(n, t, r)
                                };
                            case 3:
                                return function (t, r, o) {
                                    return e.call(n, t, r, o)
                                };
                            case 4:
                                return function (t, r, o, a) {
                                    return e.call(n, t, r, o, a)
                                }
                        }
                        return O(e, n)
                    }

                    function p(e) {
                        function n() {
                            var e = l ? s : this;
                            if (o) {
                                var m = i(o);
                                dn.apply(m, arguments)
                            }
                            if ((a || d) && (m || (m = i(arguments)), a && dn.apply(m, a), d && m.length < u))return r |= 16, p([t, g ? r : -4 & r, m, null, s, u]);
                            if (m || (m = arguments), f && (t = e[y]), this instanceof n) {
                                e = c(t.prototype);
                                var b = t.apply(e, m);
                                return x(b) ? b : e
                            }
                            return t.apply(e, m)
                        }

                        var t = e[0], r = e[1], o = e[2], a = e[3], s = e[4], u = e[5], l = 1 & r, f = 2 & r, d = 4 & r, g = 8 & r, y = t;
                        return jn(n, e), n
                    }

                    function d(e, n, t, r, o) {
                        (En(n) ? E : Ln)(n, function (n, a) {
                            var i, s, u = n, l = e[a];
                            if (n && ((s = En(n)) || Bn(n))) {
                                for (var c = r.length; c--;)if (i = r[c] == n) {
                                    l = o[c];
                                    break
                                }
                                if (!i) {
                                    var f;
                                    t && (u = t(l, n), (f = "undefined" != typeof u) && (l = u)), f || (l = s ? En(l) ? l : [] : Bn(l) ? l : {}), r.push(n), o.push(l), f || d(l, n, t, r, o)
                                }
                            } else t && (u = t(l, n), "undefined" == typeof u && (u = n)), "undefined" != typeof u && (l = u);
                            e[a] = l
                        })
                    }

                    function g(e, n, t, r, o, a) {
                        var s = 1 & n, l = 2 & n, c = 4 & n, f = 16 & n, d = 32 & n;
                        if (!l && !_(e))throw new TypeError;
                        f && !t.length && (n &= -17, f = t = !1), d && !r.length && (n &= -33, d = r = !1);
                        var y = e && e.__bindData__;
                        if (y && y !== !0)return y = i(y), y[2] && (y[2] = i(y[2])), y[3] && (y[3] = i(y[3])), !s || 1 & y[1] || (y[4] = o), !s && 1 & y[1] && (n |= 8), !c || 4 & y[1] || (y[5] = a), f && dn.apply(y[2] || (y[2] = []), t), d && yn.apply(y[3] || (y[3] = []), r), y[1] |= n, g.apply(null, y);
                        var m = 1 == n || 17 === n ? u : p;
                        return m([e, n, t, r, o, a])
                    }

                    function y() {
                        K.shadowedProps = I, K.array = K.bottom = K.loop = K.top = "", K.init = "iterable", K.useHas = !0;
                        for (var e, n = 0; e = arguments[n]; n++)for (var t in e)K[t] = e[t];
                        var r = K.args;
                        K.firstArg = /^[^,]+/.exec(r)[0];
                        var o = Function("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + r + ") {\n" + An(K) + "\n}");
                        return o(f, W, on, pn, C, h, En, A, K.keys, an, Q, _n, V, sn, un)
                    }

                    function m(e) {
                        return "function" == typeof e && ln.test(e)
                    }

                    function b(e) {
                        var n, t;
                        return !e || un.call(e) != X || (n = e.constructor, _(n) && !(n instanceof n)) || !xn.argsClass && h(e) || !xn.nodeClass && o(e) ? !1 : xn.ownLast ? (Mn(e, function (e, n, r) {
                            return t = pn.call(r, n), !1
                        }), t !== !1) : (Mn(e, function (e, n) {
                            t = n
                        }), "undefined" == typeof t || pn.call(e, t))
                    }

                    function h(e) {
                        return e && "object" == typeof e && "number" == typeof e.length && un.call(e) == D || !1
                    }

                    function v(e, n, t, r) {
                        return "boolean" != typeof n && null != n && (r = t, t = n, n = !1), l(e, n, "function" == typeof t && f(t, r, 1))
                    }

                    function w(e) {
                        var n = !0;
                        if (!e)return n;
                        var t = un.call(e), r = e.length;
                        return t == R || t == V || (xn.argsClass ? t == D : h(e)) || t == X && "number" == typeof r && _(e.splice) ? !r : (Ln(e, function () {
                            return n = !1
                        }), n)
                    }

                    function _(e) {
                        return "function" == typeof e
                    }

                    function x(e) {
                        return !(!e || !Q[typeof e])
                    }

                    function A(e) {
                        return "string" == typeof e || e && "object" == typeof e && un.call(e) == V || !1
                    }

                    function j(e) {
                        var n = arguments, t = 2;
                        if (!x(e))return e;
                        if ("number" != typeof n[2] && (t = n.length), t > 3 && "function" == typeof n[t - 2])var o = f(n[--t - 1], n[t--], 2); else t > 2 && "function" == typeof n[t - 1] && (o = n[--t]);
                        for (var s = i(arguments, 1, t), u = -1, l = r(), c = r(); ++u < t;)d(e, s[u], o, l, c);
                        return a(l), a(c), e
                    }

                    function E(e, n, t) {
                        if (n && "undefined" == typeof t && En(e))for (var r = -1, o = e.length; ++r < o && n(e[r], r, e) !== !1;); else Sn(e, n, t);
                        return e
                    }

                    function P(e) {
                        for (var n = -1, t = e ? e.length : 0, r = []; ++n < t;) {
                            var o = e[n];
                            o && r.push(o)
                        }
                        return r
                    }

                    function O(e, n) {
                        return arguments.length > 2 ? g(e, 17, i(arguments, 2), null, n) : g(e, 1, null, null, n)
                    }

                    function T(e) {
                        return e
                    }

                    function N() {
                    }

                    var S = [], C = {}, M = 40, L = /\w*$/, B = /^\s*function[ \n\r\t]+\w/, F = /\bthis\b/, I = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"], D = "[object Arguments]", R = "[object Array]", H = "[object Boolean]", U = "[object Date]", W = "[object Error]", q = "[object Function]", $ = "[object Number]", X = "[object Object]", G = "[object RegExp]", V = "[object String]", z = {};
                    z[q] = !1, z[D] = z[R] = z[H] = z[U] = z[$] = z[X] = z[G] = z[V] = !0;
                    var J = {configurable: !1, enumerable: !1, value: null, writable: !1}, K = {
                        args: "",
                        array: null,
                        bottom: "",
                        firstArg: "",
                        init: "",
                        keys: null,
                        loop: "",
                        shadowedProps: null,
                        support: null,
                        top: "",
                        useHas: !1
                    }, Q = {
                        "boolean": !1,
                        "function": !0,
                        object: !0,
                        number: !1,
                        string: !1,
                        undefined: !1
                    }, Y = Q[typeof window] && window || this, Z = Q[typeof t] && t && !t.nodeType && t, en = Q[typeof n] && n && !n.nodeType && n, nn = en && en.exports === Z && Z, tn = Q[typeof e] && e;
                    !tn || tn.global !== tn && tn.window !== tn || (Y = tn);
                    var rn = [], on = Error.prototype, an = Object.prototype, sn = String.prototype, un = an.toString, ln = RegExp("^" + String(un).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), cn = Function.prototype.toString, fn = m(fn = Object.getPrototypeOf) && fn, pn = an.hasOwnProperty, dn = rn.push, gn = an.propertyIsEnumerable, yn = rn.unshift, mn = function () {
                        try {
                            var e = {}, n = m(n = Object.defineProperty) && n, t = n(e, e, e) && n
                        } catch (r) {
                        }
                        return t
                    }(), bn = m(bn = Object.create) && bn, hn = m(hn = Array.isArray) && hn, vn = m(vn = Object.keys) && vn, wn = {};
                    wn[R] = Array, wn[H] = Boolean, wn[U] = Date, wn[q] = Function, wn[X] = Object, wn[$] = Number, wn[G] = RegExp, wn[V] = String;
                    var _n = {};
                    _n[R] = _n[U] = _n[$] = {
                        constructor: !0,
                        toLocaleString: !0,
                        toString: !0,
                        valueOf: !0
                    }, _n[H] = _n[V] = {
                        constructor: !0,
                        toString: !0,
                        valueOf: !0
                    }, _n[W] = _n[q] = _n[G] = {constructor: !0, toString: !0}, _n[X] = {constructor: !0}, function () {
                        for (var e = I.length; e--;) {
                            var n = I[e];
                            for (var t in _n)pn.call(_n, t) && !pn.call(_n[t], n) && (_n[t][n] = !1)
                        }
                    }();
                    var xn = s.support = {};
                    !function () {
                        var e = function () {
                            this.x = 1
                        }, n = {0: 1, length: 1}, t = [];
                        e.prototype = {valueOf: 1, y: 1};
                        for (var r in new e)t.push(r);
                        for (r in arguments);
                        xn.argsClass = un.call(arguments) == D, xn.argsObject = arguments.constructor == Object && !(arguments instanceof Array), xn.enumErrorProps = gn.call(on, "message") || gn.call(on, "name"), xn.enumPrototypes = gn.call(e, "prototype"), xn.funcDecomp = !m(Y.WinRTError) && F.test(function () {
                            return this
                        }), xn.funcNames = "string" == typeof Function.name, xn.nonEnumArgs = 0 != r, xn.nonEnumShadows = !/valueOf/.test(t), xn.ownLast = "x" != t[0], xn.spliceObjects = (rn.splice.call(n, 0, 1), !n[0]), xn.unindexedChars = "x"[0] + Object("x")[0] != "xx";
                        try {
                            xn.nodeClass = !(un.call(document) == X && !({toString: 0} + ""))
                        } catch (o) {
                            xn.nodeClass = !0
                        }
                    }(1);
                    var An = function (e) {
                        var n = "var index, iterable = " + e.firstArg + ", result = " + e.init + ";\nif (!iterable) return result;\n" + e.top + ";";
                        e.array ? (n += "\nvar length = iterable.length; index = -1;\nif (" + e.array + ") {  ", xn.unindexedChars && (n += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "), n += "\n  while (++index < length) {\n    " + e.loop + ";\n  }\n}\nelse {  ") : xn.nonEnumArgs && (n += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + e.loop + ";\n    }\n  } else {  "), xn.enumPrototypes && (n += "\n  var skipProto = typeof iterable == 'function';\n  "), xn.enumErrorProps && (n += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");
                        var t = [];
                        if (xn.enumPrototypes && t.push('!(skipProto && index == "prototype")'), xn.enumErrorProps && t.push('!(skipErrorProps && (index == "message" || index == "name"))'), e.useHas && e.keys)n += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n", t.length && (n += "    if (" + t.join(" && ") + ") {\n  "), n += e.loop + ";    ", t.length && (n += "\n    }"), n += "\n  }  "; else if (n += "\n  for (index in iterable) {\n", e.useHas && t.push("hasOwnProperty.call(iterable, index)"), t.length && (n += "    if (" + t.join(" && ") + ") {\n  "), n += e.loop + ";    ", t.length && (n += "\n    }"), n += "\n  }    ", xn.nonEnumShadows) {
                            for (n += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ", k = 0; k < 7; k++)n += "\n    index = '" + e.shadowedProps[k] + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))", e.useHas || (n += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"), n += ") {\n      " + e.loop + ";\n    }      ";
                            n += "\n  }    "
                        }
                        return (e.array || xn.nonEnumArgs) && (n += "\n}"), n += e.bottom + ";\nreturn result"
                    };
                    bn || (c = function () {
                        function e() {
                        }

                        return function (n) {
                            if (x(n)) {
                                e.prototype = n;
                                var t = new e;
                                e.prototype = null
                            }
                            return t || Y.Object()
                        }
                    }());
                    var jn = mn ? function (e, n) {
                        J.value = n, mn(e, "__bindData__", J)
                    } : N;
                    xn.argsClass || (h = function (e) {
                        return e && "object" == typeof e && "number" == typeof e.length && pn.call(e, "callee") && !gn.call(e, "callee") || !1
                    });
                    var En = hn || function (e) {
                            return e && "object" == typeof e && "number" == typeof e.length && un.call(e) == R || !1
                        }, Pn = y({
                        args: "object",
                        init: "[]",
                        top: "if (!(objectTypes[typeof object])) return result",
                        loop: "result.push(index)"
                    }), kn = vn ? function (e) {
                        return x(e) ? xn.enumPrototypes && "function" == typeof e || xn.nonEnumArgs && e.length && h(e) ? Pn(e) : vn(e) : []
                    } : Pn, On = {
                        args: "collection, callback, thisArg",
                        top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
                        array: "typeof length == 'number'",
                        keys: kn,
                        loop: "if (callback(iterable[index], index, collection) === false) return result"
                    }, Tn = {
                        args: "object, source, guard",
                        top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",
                        keys: kn,
                        loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
                        bottom: "  }\n}"
                    }, Nn = {
                        top: "if (!objectTypes[typeof iterable]) return result;\n" + On.top,
                        array: !1
                    }, Sn = y(On), Cn = y(Tn, {
                        top: Tn.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),
                        loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"
                    }), Mn = y(On, Nn, {useHas: !1}), Ln = y(On, Nn);
                    _(/x/) && (_ = function (e) {
                        return "function" == typeof e && un.call(e) == q
                    });
                    var Bn = fn ? function (e) {
                        if (!e || un.call(e) != X || !xn.argsClass && h(e))return !1;
                        var n = e.valueOf, t = m(n) && (t = fn(n)) && fn(t);
                        return t ? e == t || fn(e) == t : b(e)
                    } : b;
                    s.assign = Cn, s.bind = O, s.compact = P, s.forEach = E, s.forIn = Mn, s.forOwn = Ln, s.keys = kn, s.merge = j, s.each = E, s.extend = Cn, s.clone = v, s.identity = T, s.isArguments = h, s.isArray = En, s.isEmpty = w, s.isFunction = _, s.isObject = x, s.isPlainObject = Bn, s.isString = A, s.noop = N, s.VERSION = "2.4.1", Z && en && nn && ((en.exports = s)._ = s)
                }).call(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}], 3: [function (e, n) {
            function t(e, n) {
                switch (e && e.type || null) {
                    case"FeatureCollection":
                        return e.features = e.features.map(r(t, n)), e;
                    case"Feature":
                        return e.geometry = t(e.geometry, n), e;
                    case"Polygon":
                    case"MultiPolygon":
                        return o(e, n);
                    default:
                        return e
                }
            }

            function r(e, n) {
                return function (t) {
                    return e(t, n)
                }
            }

            function o(e, n) {
                return "Polygon" === e.type ? e.coordinates = a(e.coordinates, n) : "MultiPolygon" === e.type && (e.coordinates = e.coordinates.map(r(a, n))), e
            }

            function a(e, n) {
                n = !!n, e[0] = i(e[0], !n);
                for (var t = 1; t < e.length; t++)e[t] = i(e[t], n);
                return e
            }

            function i(e, n) {
                return s(e) === n ? e : e.reverse()
            }

            function s(e) {
                return u.ring(e) >= 0
            }

            var u = e("geojson-area");
            n.exports = t
        }, {"geojson-area": 4}], 4: [function (e, n) {
            function t(e) {
                if ("Polygon" === e.type)return r(e.coordinates);
                if ("MultiPolygon" === e.type) {
                    for (var n = 0, t = 0; t < e.coordinates.length; t++)n += r(e.coordinates[t]);
                    return n
                }
                return null
            }

            function r(e) {
                var n = 0;
                if (e && e.length > 0) {
                    n += Math.abs(o(e[0]));
                    for (var t = 1; t < e.length; t++)n -= Math.abs(o(e[t]))
                }
                return n
            }

            function o(e) {
                var n = 0;
                if (e.length > 2) {
                    for (var t, r, o = 0; o < e.length - 1; o++)t = e[o], r = e[o + 1], n += a(r[0] - t[0]) * (2 + Math.sin(a(t[1])) + Math.sin(a(r[1])));
                    n = n * i.RADIUS * i.RADIUS / 2
                }
                return n
            }

            function a(e) {
                return e * Math.PI / 180
            }

            var i = e("wgs84");
            n.exports.geometry = t, n.exports.ring = o
        }, {wgs84: 5}], 5: [function (e, n) {
            n.exports.RADIUS = 6378137, n.exports.FLATTENING = 1 / 298.257223563, n.exports.POLAR_RADIUS = 6356752.3142
        }, {}], 6: [function (e, n) {
            n.exports = {
                building: !0,
                highway: {included_values: {services: !0, rest_area: !0, escape: !0}},
                natural: {excluded_values: {coastline: !0, cliff: !0, ridge: !0, arete: !0, tree_row: !0}},
                landuse: !0,
                waterway: {included_values: {riverbank: !0, dock: !0, boatyard: !0, dam: !0}},
                amenity: !0,
                leisure: !0,
                barrier: {
                    included_values: {
                        city_wall: !0,
                        ditch: !0,
                        hedge: !0,
                        retaining_wall: !0,
                        wall: !0,
                        spikes: !0
                    }
                },
                railway: {included_values: {station: !0, turntable: !0, roundhouse: !0, platform: !0}},
                area: !0,
                boundary: !0,
                man_made: {excluded_values: {cutline: !0, embankment: !0, pipeline: !0}},
                power: {included_values: {plant: !0, substation: !0, generator: !0, transformer: !0}},
                place: !0,
                shop: !0,
                aeroway: {excluded_values: {taxiway: !0}},
                tourism: !0,
                historic: !0,
                public_transport: !0,
                office: !0,
                "building:part": !0,
                military: !0,
                ruins: !0,
                "area:highway": !0,
                craft: !0,
                golf: !0
            }
        }, {}]
    }, {}, [1])(1)
});