var exports = {};
(() => {
  var A = {
      742: (A, I) => {
        "use strict";
        (I.byteLength = function (A) {
          var I = i(A),
            g = I[0],
            C = I[1];
          return (3 * (g + C)) / 4 - C;
        }),
          (I.toByteArray = function (A) {
            var I,
              g,
              B = i(A),
              E = B[0],
              D = B[1],
              o = new Q(
                (function (A, I, g) {
                  return (3 * (I + g)) / 4 - g;
                })(0, E, D)
              ),
              w = 0,
              N = D > 0 ? E - 4 : E;
            for (g = 0; g < N; g += 4)
              (I =
                (C[A.charCodeAt(g)] << 18) |
                (C[A.charCodeAt(g + 1)] << 12) |
                (C[A.charCodeAt(g + 2)] << 6) |
                C[A.charCodeAt(g + 3)]),
                (o[w++] = (I >> 16) & 255),
                (o[w++] = (I >> 8) & 255),
                (o[w++] = 255 & I);
            return (
              2 === D &&
                ((I =
                  (C[A.charCodeAt(g)] << 2) | (C[A.charCodeAt(g + 1)] >> 4)),
                (o[w++] = 255 & I)),
              1 === D &&
                ((I =
                  (C[A.charCodeAt(g)] << 10) |
                  (C[A.charCodeAt(g + 1)] << 4) |
                  (C[A.charCodeAt(g + 2)] >> 2)),
                (o[w++] = (I >> 8) & 255),
                (o[w++] = 255 & I)),
              o
            );
          }),
          (I.fromByteArray = function (A) {
            for (
              var I,
                C = A.length,
                Q = C % 3,
                B = [],
                E = 16383,
                D = 0,
                i = C - Q;
              D < i;
              D += E
            )
              B.push(o(A, D, D + E > i ? i : D + E));
            return (
              1 === Q
                ? ((I = A[C - 1]), B.push(g[I >> 2] + g[(I << 4) & 63] + "=="))
                : 2 === Q &&
                  ((I = (A[C - 2] << 8) + A[C - 1]),
                  B.push(
                    g[I >> 10] + g[(I >> 4) & 63] + g[(I << 2) & 63] + "="
                  )),
              B.join("")
            );
          });
        for (
          var g = [],
            C = [],
            Q = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            B =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            E = 0,
            D = B.length;
          E < D;
          ++E
        )
          (g[E] = B[E]), (C[B.charCodeAt(E)] = E);
        function i(A) {
          var I = A.length;
          if (I % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var g = A.indexOf("=");
          return -1 === g && (g = I), [g, g === I ? 0 : 4 - (g % 4)];
        }
        function o(A, I, C) {
          for (var Q, B, E = [], D = I; D < C; D += 3)
            (Q =
              ((A[D] << 16) & 16711680) +
              ((A[D + 1] << 8) & 65280) +
              (255 & A[D + 2])),
              E.push(
                g[((B = Q) >> 18) & 63] +
                  g[(B >> 12) & 63] +
                  g[(B >> 6) & 63] +
                  g[63 & B]
              );
          return E.join("");
        }
        (C["-".charCodeAt(0)] = 62), (C["_".charCodeAt(0)] = 63);
      },
      470: (A) => {
        "use strict";
        function I(A) {
          if ("string" != typeof A)
            throw new TypeError(
              "Path must be a string. Received " + JSON.stringify(A)
            );
        }
        function g(A, I) {
          for (var g, C = "", Q = 0, B = -1, E = 0, D = 0; D <= A.length; ++D) {
            if (D < A.length) g = A.charCodeAt(D);
            else {
              if (47 === g) break;
              g = 47;
            }
            if (47 === g) {
              if (B === D - 1 || 1 === E);
              else if (B !== D - 1 && 2 === E) {
                if (
                  C.length < 2 ||
                  2 !== Q ||
                  46 !== C.charCodeAt(C.length - 1) ||
                  46 !== C.charCodeAt(C.length - 2)
                )
                  if (C.length > 2) {
                    var i = C.lastIndexOf("/");
                    if (i !== C.length - 1) {
                      -1 === i
                        ? ((C = ""), (Q = 0))
                        : (Q =
                            (C = C.slice(0, i)).length -
                            1 -
                            C.lastIndexOf("/")),
                        (B = D),
                        (E = 0);
                      continue;
                    }
                  } else if (2 === C.length || 1 === C.length) {
                    (C = ""), (Q = 0), (B = D), (E = 0);
                    continue;
                  }
                I && (C.length > 0 ? (C += "/..") : (C = ".."), (Q = 2));
              } else
                C.length > 0
                  ? (C += "/" + A.slice(B + 1, D))
                  : (C = A.slice(B + 1, D)),
                  (Q = D - B - 1);
              (B = D), (E = 0);
            } else 46 === g && -1 !== E ? ++E : (E = -1);
          }
          return C;
        }
        var C = {
          resolve: function () {
            for (
              var A, C = "", Q = !1, B = arguments.length - 1;
              B >= -1 && !Q;
              B--
            ) {
              var E;
              B >= 0
                ? (E = arguments[B])
                : (void 0 === A && (A = process.cwd()), (E = A)),
                I(E),
                0 !== E.length &&
                  ((C = E + "/" + C), (Q = 47 === E.charCodeAt(0)));
            }
            return (
              (C = g(C, !Q)),
              Q ? (C.length > 0 ? "/" + C : "/") : C.length > 0 ? C : "."
            );
          },
          normalize: function (A) {
            if ((I(A), 0 === A.length)) return ".";
            var C = 47 === A.charCodeAt(0),
              Q = 47 === A.charCodeAt(A.length - 1);
            return (
              0 !== (A = g(A, !C)).length || C || (A = "."),
              A.length > 0 && Q && (A += "/"),
              C ? "/" + A : A
            );
          },
          isAbsolute: function (A) {
            return I(A), A.length > 0 && 47 === A.charCodeAt(0);
          },
          join: function () {
            if (0 === arguments.length) return ".";
            for (var A, g = 0; g < arguments.length; ++g) {
              var Q = arguments[g];
              I(Q), Q.length > 0 && (void 0 === A ? (A = Q) : (A += "/" + Q));
            }
            return void 0 === A ? "." : C.normalize(A);
          },
          relative: function (A, g) {
            if ((I(A), I(g), A === g)) return "";
            if ((A = C.resolve(A)) === (g = C.resolve(g))) return "";
            for (var Q = 1; Q < A.length && 47 === A.charCodeAt(Q); ++Q);
            for (
              var B = A.length, E = B - Q, D = 1;
              D < g.length && 47 === g.charCodeAt(D);
              ++D
            );
            for (
              var i = g.length - D, o = E < i ? E : i, w = -1, N = 0;
              N <= o;
              ++N
            ) {
              if (N === o) {
                if (i > o) {
                  if (47 === g.charCodeAt(D + N)) return g.slice(D + N + 1);
                  if (0 === N) return g.slice(D + N);
                } else
                  E > o &&
                    (47 === A.charCodeAt(Q + N) ? (w = N) : 0 === N && (w = 0));
                break;
              }
              var R = A.charCodeAt(Q + N);
              if (R !== g.charCodeAt(D + N)) break;
              47 === R && (w = N);
            }
            var F = "";
            for (N = Q + w + 1; N <= B; ++N)
              (N !== B && 47 !== A.charCodeAt(N)) ||
                (0 === F.length ? (F += "..") : (F += "/.."));
            return F.length > 0
              ? F + g.slice(D + w)
              : ((D += w), 47 === g.charCodeAt(D) && ++D, g.slice(D));
          },
          _makeLong: function (A) {
            return A;
          },
          dirname: function (A) {
            if ((I(A), 0 === A.length)) return ".";
            for (
              var g = A.charCodeAt(0),
                C = 47 === g,
                Q = -1,
                B = !0,
                E = A.length - 1;
              E >= 1;
              --E
            )
              if (47 === (g = A.charCodeAt(E))) {
                if (!B) {
                  Q = E;
                  break;
                }
              } else B = !1;
            return -1 === Q
              ? C
                ? "/"
                : "."
              : C && 1 === Q
              ? "//"
              : A.slice(0, Q);
          },
          basename: function (A, g) {
            if (void 0 !== g && "string" != typeof g)
              throw new TypeError('"ext" argument must be a string');
            I(A);
            var C,
              Q = 0,
              B = -1,
              E = !0;
            if (void 0 !== g && g.length > 0 && g.length <= A.length) {
              if (g.length === A.length && g === A) return "";
              var D = g.length - 1,
                i = -1;
              for (C = A.length - 1; C >= 0; --C) {
                var o = A.charCodeAt(C);
                if (47 === o) {
                  if (!E) {
                    Q = C + 1;
                    break;
                  }
                } else
                  -1 === i && ((E = !1), (i = C + 1)),
                    D >= 0 &&
                      (o === g.charCodeAt(D)
                        ? -1 == --D && (B = C)
                        : ((D = -1), (B = i)));
              }
              return (
                Q === B ? (B = i) : -1 === B && (B = A.length), A.slice(Q, B)
              );
            }
            for (C = A.length - 1; C >= 0; --C)
              if (47 === A.charCodeAt(C)) {
                if (!E) {
                  Q = C + 1;
                  break;
                }
              } else -1 === B && ((E = !1), (B = C + 1));
            return -1 === B ? "" : A.slice(Q, B);
          },
          extname: function (A) {
            I(A);
            for (
              var g = -1, C = 0, Q = -1, B = !0, E = 0, D = A.length - 1;
              D >= 0;
              --D
            ) {
              var i = A.charCodeAt(D);
              if (47 !== i)
                -1 === Q && ((B = !1), (Q = D + 1)),
                  46 === i
                    ? -1 === g
                      ? (g = D)
                      : 1 !== E && (E = 1)
                    : -1 !== g && (E = -1);
              else if (!B) {
                C = D + 1;
                break;
              }
            }
            return -1 === g ||
              -1 === Q ||
              0 === E ||
              (1 === E && g === Q - 1 && g === C + 1)
              ? ""
              : A.slice(g, Q);
          },
          format: function (A) {
            if (null === A || "object" != typeof A)
              throw new TypeError(
                'The "pathObject" argument must be of type Object. Received type ' +
                  typeof A
              );
            return (function (A, I) {
              var g = I.dir || I.root,
                C = I.base || (I.name || "") + (I.ext || "");
              return g ? (g === I.root ? g + C : g + "/" + C) : C;
            })(0, A);
          },
          parse: function (A) {
            I(A);
            var g = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === A.length) return g;
            var C,
              Q = A.charCodeAt(0),
              B = 47 === Q;
            B ? ((g.root = "/"), (C = 1)) : (C = 0);
            for (
              var E = -1, D = 0, i = -1, o = !0, w = A.length - 1, N = 0;
              w >= C;
              --w
            )
              if (47 !== (Q = A.charCodeAt(w)))
                -1 === i && ((o = !1), (i = w + 1)),
                  46 === Q
                    ? -1 === E
                      ? (E = w)
                      : 1 !== N && (N = 1)
                    : -1 !== E && (N = -1);
              else if (!o) {
                D = w + 1;
                break;
              }
            return (
              -1 === E ||
              -1 === i ||
              0 === N ||
              (1 === N && E === i - 1 && E === D + 1)
                ? -1 !== i &&
                  (g.base = g.name =
                    0 === D && B ? A.slice(1, i) : A.slice(D, i))
                : (0 === D && B
                    ? ((g.name = A.slice(1, E)), (g.base = A.slice(1, i)))
                    : ((g.name = A.slice(D, E)), (g.base = A.slice(D, i))),
                  (g.ext = A.slice(E, i))),
              D > 0 ? (g.dir = A.slice(0, D - 1)) : B && (g.dir = "/"),
              g
            );
          },
          sep: "/",
          delimiter: ":",
          win32: null,
          posix: null,
        };
        (C.posix = C), (A.exports = C);
      },
      526: (A) => {
        "use strict";
        A.exports =
      },
      93: (A, I, g) => {
        var C,
          Q =
            ((C =
              (C =
                "undefined" != typeof document && document.currentScript
                  ? document.currentScript.src
                  : void 0) || "/index.js"),
            function (A) {
              var I, Q;
              (D = void 0 !== (A = A || {}) ? A : {}).ready = new Promise(
                function (A, g) {
                  (I = A), (Q = g);
                }
              );
              const B = g(742),
                E = g(526);
              var D;
              (D = { noInitialRun: !0 }).wasmBinary = B.toByteArray(E);
              var i,
                o = {};
              for (i in D) D.hasOwnProperty(i) && (o[i] = D[i]);
              var w = [],
                N = "./this.program",
                R = function (A, I) {
                  throw I;
                },
                F = !1,
                G = !1,
                y = !1,
                s = !1;
              (F = "object" == typeof window),
                (G = "function" == typeof importScripts),
                (y =
                  "object" == typeof process &&
                  "object" == typeof process.versions &&
                  "string" == typeof process.versions.node),
                (s = !F && !y && !G);
              var h,
                K,
                M,
                S,
                k,
                a = "";
              function U(A) {
                return D.locateFile ? D.locateFile(A, a) : a + A;
              }
              y
                ? ((a = G ? g(470).dirname(a) + "/" : "//"),
                  (h = function (A, I) {
                    return (
                      S || (S = g(351)),
                      k || (k = g(470)),
                      (A = k.normalize(A)),
                      S.readFileSync(A, I ? null : "utf8")
                    );
                  }),
                  (M = function (A) {
                    var I = h(A, !0);
                    return I.buffer || (I = new Uint8Array(I)), r(I.buffer), I;
                  }),
                  process.argv.length > 1 &&
                    (N = process.argv[1].replace(/\\/g, "/")),
                  (w = process.argv.slice(2)),
                  process.on("uncaughtException", function (A) {
                    if (!(A instanceof IC)) throw A;
                  }),
                  process.on("unhandledRejection", MA),
                  (R = function (A) {
                    process.exit(A);
                  }),
                  (D.inspect = function () {
                    return "[Emscripten Module object]";
                  }))
                : s
                ? ("undefined" != typeof read &&
                    (h = function (A) {
                      return read(A);
                    }),
                  (M = function (A) {
                    var I;
                    return "function" == typeof readbuffer
                      ? new Uint8Array(readbuffer(A))
                      : (r("object" == typeof (I = read(A, "binary"))), I);
                  }),
                  "undefined" != typeof scriptArgs
                    ? (w = scriptArgs)
                    : void 0 !== arguments && (w = arguments),
                  "function" == typeof quit &&
                    (R = function (A) {
                      quit(A);
                    }),
                  "undefined" != typeof print &&
                    ("undefined" == typeof console && (console = {}),
                    (console.log = print),
                    (console.warn = console.error =
                      "undefined" != typeof printErr ? printErr : print)))
                : (F || G) &&
                  (G
                    ? (a = self.location.href)
                    : "undefined" != typeof document &&
                      document.currentScript &&
                      (a = document.currentScript.src),
                  C && (a = C),
                  (a =
                    0 !== a.indexOf("blob:")
                      ? a.substr(0, a.lastIndexOf("/") + 1)
                      : ""),
                  (h = function (A) {
                    var I = new XMLHttpRequest();
                    return I.open("GET", A, !1), I.send(null), I.responseText;
                  }),
                  G &&
                    (M = function (A) {
                      var I = new XMLHttpRequest();
                      return (
                        I.open("GET", A, !1),
                        (I.responseType = "arraybuffer"),
                        I.send(null),
                        new Uint8Array(I.response)
                      );
                    }),
                  (K = function (A, I, g) {
                    var C = new XMLHttpRequest();
                    C.open("GET", A, !0),
                      (C.responseType = "arraybuffer"),
                      (C.onload = function () {
                        200 == C.status || (0 == C.status && C.response)
                          ? I(C.response)
                          : g();
                      }),
                      (C.onerror = g),
                      C.send(null);
                  }));
              var J = D.print || console.log.bind(console),
                Y = D.printErr || console.warn.bind(console);
              for (i in o) o.hasOwnProperty(i) && (D[i] = o[i]);
              (o = null),
                D.arguments && (w = D.arguments),
                D.thisProgram && (N = D.thisProgram),
                D.quit && (R = D.quit);
              var L,
                c = function (A) {};
              D.wasmBinary && (L = D.wasmBinary);
              var H,
                q = D.noExitRuntime || !0;
              "object" != typeof WebAssembly &&
                MA("no native wasm support detected");
              var t = !1;
              function r(A, I) {
                A || MA("Assertion failed: " + I);
              }
              var d =
                "undefined" != typeof TextDecoder
                  ? new TextDecoder("utf8")
                  : void 0;
              function n(A, I, g) {
                for (var C = I + g, Q = I; A[Q] && !(Q >= C); ) ++Q;
                if (Q - I > 16 && A.subarray && d)
                  return d.decode(A.subarray(I, Q));
                for (var B = ""; I < Q; ) {
                  var E = A[I++];
                  if (128 & E) {
                    var D = 63 & A[I++];
                    if (192 != (224 & E)) {
                      var i = 63 & A[I++];
                      if (
                        (E =
                          224 == (240 & E)
                            ? ((15 & E) << 12) | (D << 6) | i
                            : ((7 & E) << 18) |
                              (D << 12) |
                              (i << 6) |
                              (63 & A[I++])) < 65536
                      )
                        B += String.fromCharCode(E);
                      else {
                        var o = E - 65536;
                        B += String.fromCharCode(
                          55296 | (o >> 10),
                          56320 | (1023 & o)
                        );
                      }
                    } else B += String.fromCharCode(((31 & E) << 6) | D);
                  } else B += String.fromCharCode(E);
                }
                return B;
              }
              function f(A, I) {
                return A ? n(p, A, I) : "";
              }
              function e(A, I, g, C) {
                if (!(C > 0)) return 0;
                for (var Q = g, B = g + C - 1, E = 0; E < A.length; ++E) {
                  var D = A.charCodeAt(E);
                  if (
                    (D >= 55296 &&
                      D <= 57343 &&
                      (D =
                        (65536 + ((1023 & D) << 10)) |
                        (1023 & A.charCodeAt(++E))),
                    D <= 127)
                  ) {
                    if (g >= B) break;
                    I[g++] = D;
                  } else if (D <= 2047) {
                    if (g + 1 >= B) break;
                    (I[g++] = 192 | (D >> 6)), (I[g++] = 128 | (63 & D));
                  } else if (D <= 65535) {
                    if (g + 2 >= B) break;
                    (I[g++] = 224 | (D >> 12)),
                      (I[g++] = 128 | ((D >> 6) & 63)),
                      (I[g++] = 128 | (63 & D));
                  } else {
                    if (g + 3 >= B) break;
                    (I[g++] = 240 | (D >> 18)),
                      (I[g++] = 128 | ((D >> 12) & 63)),
                      (I[g++] = 128 | ((D >> 6) & 63)),
                      (I[g++] = 128 | (63 & D));
                  }
                }
                return (I[g] = 0), g - Q;
              }
              function x(A, I, g) {
                return e(A, p, I, g);
              }
              function l(A) {
                for (var I = 0, g = 0; g < A.length; ++g) {
                  var C = A.charCodeAt(g);
                  C >= 55296 &&
                    C <= 57343 &&
                    (C =
                      (65536 + ((1023 & C) << 10)) |
                      (1023 & A.charCodeAt(++g))),
                    C <= 127 ? ++I : (I += C <= 2047 ? 2 : C <= 65535 ? 3 : 4);
                }
                return I;
              }
              var W,
                j,
                p,
                T,
                Z,
                V,
                O,
                P,
                m,
                b =
                  "undefined" != typeof TextDecoder
                    ? new TextDecoder("utf-16le")
                    : void 0;
              function u(A, I) {
                for (var g = A, C = g >> 1, Q = C + I / 2; !(C >= Q) && Z[C]; )
                  ++C;
                if ((g = C << 1) - A > 32 && b)
                  return b.decode(p.subarray(A, g));
                for (var B = "", E = 0; !(E >= I / 2); ++E) {
                  var D = T[(A + 2 * E) >> 1];
                  if (0 == D) break;
                  B += String.fromCharCode(D);
                }
                return B;
              }
              function X(A, I, g) {
                if ((void 0 === g && (g = 2147483647), g < 2)) return 0;
                for (
                  var C = I,
                    Q = (g -= 2) < 2 * A.length ? g / 2 : A.length,
                    B = 0;
                  B < Q;
                  ++B
                ) {
                  var E = A.charCodeAt(B);
                  (T[I >> 1] = E), (I += 2);
                }
                return (T[I >> 1] = 0), I - C;
              }
              function z(A) {
                return 2 * A.length;
              }
              function v(A, I) {
                for (var g = 0, C = ""; !(g >= I / 4); ) {
                  var Q = V[(A + 4 * g) >> 2];
                  if (0 == Q) break;
                  if ((++g, Q >= 65536)) {
                    var B = Q - 65536;
                    C += String.fromCharCode(
                      55296 | (B >> 10),
                      56320 | (1023 & B)
                    );
                  } else C += String.fromCharCode(Q);
                }
                return C;
              }
              function _(A, I, g) {
                if ((void 0 === g && (g = 2147483647), g < 4)) return 0;
                for (var C = I, Q = C + g - 4, B = 0; B < A.length; ++B) {
                  var E = A.charCodeAt(B);
                  if (
                    (E >= 55296 &&
                      E <= 57343 &&
                      (E =
                        (65536 + ((1023 & E) << 10)) |
                        (1023 & A.charCodeAt(++B))),
                    (V[I >> 2] = E),
                    (I += 4) + 4 > Q)
                  )
                    break;
                }
                return (V[I >> 2] = 0), I - C;
              }
              function $(A) {
                for (var I = 0, g = 0; g < A.length; ++g) {
                  var C = A.charCodeAt(g);
                  C >= 55296 && C <= 57343 && ++g, (I += 4);
                }
                return I;
              }
              function AA(A, I) {
                j.set(A, I);
              }
              function IA(A, I, g) {
                for (var C = 0; C < A.length; ++C)
                  j[I++ >> 0] = A.charCodeAt(C);
                g || (j[I >> 0] = 0);
              }
              function gA(A, I) {
                return A % I > 0 && (A += I - (A % I)), A;
              }
              function CA(A) {
                (W = A),
                  (D.HEAP8 = j = new Int8Array(A)),
                  (D.HEAP16 = T = new Int16Array(A)),
                  (D.HEAP32 = V = new Int32Array(A)),
                  (D.HEAPU8 = p = new Uint8Array(A)),
                  (D.HEAPU16 = Z = new Uint16Array(A)),
                  (D.HEAPU32 = O = new Uint32Array(A)),
                  (D.HEAPF32 = P = new Float32Array(A)),
                  (D.HEAPF64 = m = new Float64Array(A));
              }
              D.INITIAL_MEMORY;
              var QA,
                BA = [],
                EA = [],
                DA = [];
              function iA() {
                if (D.preRun)
                  for (
                    "function" == typeof D.preRun && (D.preRun = [D.preRun]);
                    D.preRun.length;

                  )
                    NA(D.preRun.shift());
                cA(BA);
              }
              function oA() {
                cA(EA);
              }
              function wA() {
                if (D.postRun)
                  for (
                    "function" == typeof D.postRun && (D.postRun = [D.postRun]);
                    D.postRun.length;

                  )
                    FA(D.postRun.shift());
                cA(DA);
              }
              function NA(A) {
                BA.unshift(A);
              }
              function RA(A) {
                EA.unshift(A);
              }
              function FA(A) {
                DA.unshift(A);
              }
              var GA = 0,
                yA = null,
                sA = null;
              function hA(A) {
                GA++, D.monitorRunDependencies && D.monitorRunDependencies(GA);
              }
              function KA(A) {
                if (
                  (GA--,
                  D.monitorRunDependencies && D.monitorRunDependencies(GA),
                  0 == GA &&
                    (null !== yA && (clearInterval(yA), (yA = null)), sA))
                ) {
                  var I = sA;
                  (sA = null), I();
                }
              }
              function MA(A) {
                D.onAbort && D.onAbort(A),
                  Y((A += "")),
                  (t = !0),
                  (A =
                    "abort(" +
                    A +
                    "). Build with -s ASSERTIONS=1 for more info.");
                var I = new WebAssembly.RuntimeError(A);
                throw (Q(I), I);
              }
              (D.preloadedImages = {}), (D.preloadedAudios = {});
              var SA = "data:application/octet-stream;base64,";
              function kA(A) {
                return A.startsWith(SA);
              }
              function aA(A) {
                return A.startsWith("file://");
              }
              var UA = "jsgeoda.wasm";
              function JA(A) {
                try {
                  if (A == UA && L) return new Uint8Array(L);
                  if (M) return M(A);
                  throw "both async and sync fetching of the wasm failed";
                } catch (A) {
                  MA(A);
                }
              }
              function YA() {
                if (!L && (F || G)) {
                  if ("function" == typeof fetch && !aA(UA))
                    return fetch(UA, { credentials: "same-origin" })
                      .then(function (A) {
                        if (!A.ok)
                          throw (
                            "failed to load wasm binary file at '" + UA + "'"
                          );
                        return A.arrayBuffer();
                      })
                      .catch(function () {
                        return JA(UA);
                      });
                  if (K)
                    return new Promise(function (A, I) {
                      K(
                        UA,
                        function (I) {
                          A(new Uint8Array(I));
                        },
                        I
                      );
                    });
                }
                return Promise.resolve().then(function () {
                  return JA(UA);
                });
              }
              function LA() {
                var A = { a: vg };
                function I(A, I) {
                  var g = A.exports;
                  (D.asm = g),
                    CA((H = D.asm.H).buffer),
                    (QA = D.asm.L),
                    RA(D.asm.I),
                    KA();
                }
                function g(A) {
                  I(A.instance);
                }
                function C(I) {
                  return YA()
                    .then(function (I) {
                      return WebAssembly.instantiate(I, A);
                    })
                    .then(I, function (A) {
                      Y("failed to asynchronously prepare wasm: " + A), MA(A);
                    });
                }
                if ((hA(), D.instantiateWasm))
                  try {
                    return D.instantiateWasm(A, I);
                  } catch (A) {
                    return (
                      Y(
                        "Module.instantiateWasm callback failed with error: " +
                          A
                      ),
                      !1
                    );
                  }
                return (
                  (L ||
                  "function" != typeof WebAssembly.instantiateStreaming ||
                  kA(UA) ||
                  aA(UA) ||
                  "function" != typeof fetch
                    ? C(g)
                    : fetch(UA, { credentials: "same-origin" }).then(function (
                        I
                      ) {
                        return WebAssembly.instantiateStreaming(I, A).then(
                          g,
                          function (A) {
                            return (
                              Y("wasm streaming compile failed: " + A),
                              Y("falling back to ArrayBuffer instantiation"),
                              C(g)
                            );
                          }
                        );
                      })
                  ).catch(Q),
                  {}
                );
              }
              function cA(A) {
                for (; A.length > 0; ) {
                  var I = A.shift();
                  if ("function" != typeof I) {
                    var g = I.func;
                    "number" == typeof g
                      ? void 0 === I.arg
                        ? QA.get(g)()
                        : QA.get(g)(I.arg)
                      : g(void 0 === I.arg ? null : I.arg);
                  } else I(D);
                }
              }
              kA(UA) || (UA = U(UA));
              var HA = 0;
              function qA() {
                return q || HA > 0;
              }
              var tA = {
                DESTRUCTOR_OFFSET: 0,
                REFCOUNT_OFFSET: 4,
                TYPE_OFFSET: 8,
                CAUGHT_OFFSET: 12,
                RETHROWN_OFFSET: 13,
                SIZE: 16,
              };
              function rA(A) {
                return _g(A + tA.SIZE) + tA.SIZE;
              }
              function dA(A) {
                (this.excPtr = A),
                  (this.ptr = A - tA.SIZE),
                  (this.set_type = function (A) {
                    V[(this.ptr + tA.TYPE_OFFSET) >> 2] = A;
                  }),
                  (this.get_type = function () {
                    return V[(this.ptr + tA.TYPE_OFFSET) >> 2];
                  }),
                  (this.set_destructor = function (A) {
                    V[(this.ptr + tA.DESTRUCTOR_OFFSET) >> 2] = A;
                  }),
                  (this.get_destructor = function () {
                    return V[(this.ptr + tA.DESTRUCTOR_OFFSET) >> 2];
                  }),
                  (this.set_refcount = function (A) {
                    V[(this.ptr + tA.REFCOUNT_OFFSET) >> 2] = A;
                  }),
                  (this.set_caught = function (A) {
                    (A = A ? 1 : 0),
                      (j[(this.ptr + tA.CAUGHT_OFFSET) >> 0] = A);
                  }),
                  (this.get_caught = function () {
                    return 0 != j[(this.ptr + tA.CAUGHT_OFFSET) >> 0];
                  }),
                  (this.set_rethrown = function (A) {
                    (A = A ? 1 : 0),
                      (j[(this.ptr + tA.RETHROWN_OFFSET) >> 0] = A);
                  }),
                  (this.get_rethrown = function () {
                    return 0 != j[(this.ptr + tA.RETHROWN_OFFSET) >> 0];
                  }),
                  (this.init = function (A, I) {
                    this.set_type(A),
                      this.set_destructor(I),
                      this.set_refcount(0),
                      this.set_caught(!1),
                      this.set_rethrown(!1);
                  }),
                  (this.add_ref = function () {
                    var A = V[(this.ptr + tA.REFCOUNT_OFFSET) >> 2];
                    V[(this.ptr + tA.REFCOUNT_OFFSET) >> 2] = A + 1;
                  }),
                  (this.release_ref = function () {
                    var A = V[(this.ptr + tA.REFCOUNT_OFFSET) >> 2];
                    return (
                      (V[(this.ptr + tA.REFCOUNT_OFFSET) >> 2] = A - 1), 1 === A
                    );
                  });
              }
              function nA(A, I, g) {
                throw (new dA(A).init(I, g), A);
              }
              var fA = {
                mappings: {},
                buffers: [null, [], []],
                printChar: function (A, I) {
                  var g = fA.buffers[A];
                  0 === I || 10 === I
                    ? ((1 === A ? J : Y)(n(g, 0)), (g.length = 0))
                    : g.push(I);
                },
                varargs: void 0,
                get: function () {
                  return (fA.varargs += 4), V[(fA.varargs - 4) >> 2];
                },
                getStr: function (A) {
                  return f(A);
                },
                get64: function (A, I) {
                  return A;
                },
              };
              function eA(A, I, g) {
                return (fA.varargs = g), 0;
              }
              function xA(A, I, g) {
                return (fA.varargs = g), 0;
              }
              function lA(A, I, g) {
                fA.varargs = g;
              }
              function WA(A, I, g, C, Q) {}
              function jA(A) {
                switch (A) {
                  case 1:
                    return 0;
                  case 2:
                    return 1;
                  case 4:
                    return 2;
                  case 8:
                    return 3;
                  default:
                    throw new TypeError("Unknown type size: " + A);
                }
              }
              function pA() {
                for (var A = new Array(256), I = 0; I < 256; ++I)
                  A[I] = String.fromCharCode(I);
                TA = A;
              }
              var TA = void 0;
              function ZA(A) {
                for (var I = "", g = A; p[g]; ) I += TA[p[g++]];
                return I;
              }
              var VA = {},
                OA = {},
                PA = {},
                mA = 48,
                bA = 57;
              function uA(A) {
                if (void 0 === A) return "_unknown";
                var I = (A = A.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
                return I >= mA && I <= bA ? "_" + A : A;
              }
              function XA(A, I) {
                return (
                  (A = uA(A)),
                  new Function(
                    "body",
                    "return function " +
                      A +
                      '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
                  )(I)
                );
              }
              function zA(A, I) {
                var g = XA(I, function (A) {
                  (this.name = I), (this.message = A);
                  var g = new Error(A).stack;
                  void 0 !== g &&
                    (this.stack =
                      this.toString() +
                      "\n" +
                      g.replace(/^Error(:[^\n]*)?\n/, ""));
                });
                return (
                  (g.prototype = Object.create(A.prototype)),
                  (g.prototype.constructor = g),
                  (g.prototype.toString = function () {
                    return void 0 === this.message
                      ? this.name
                      : this.name + ": " + this.message;
                  }),
                  g
                );
              }
              var vA = void 0;
              function _A(A) {
                throw new vA(A);
              }
              var $A = void 0;
              function AI(A) {
                throw new $A(A);
              }
              function II(A, I, g) {
                function C(I) {
                  var C = g(I);
                  C.length !== A.length &&
                    AI("Mismatched type converter count");
                  for (var Q = 0; Q < A.length; ++Q) gI(A[Q], C[Q]);
                }
                A.forEach(function (A) {
                  PA[A] = I;
                });
                var Q = new Array(I.length),
                  B = [],
                  E = 0;
                I.forEach(function (A, I) {
                  OA.hasOwnProperty(A)
                    ? (Q[I] = OA[A])
                    : (B.push(A),
                      VA.hasOwnProperty(A) || (VA[A] = []),
                      VA[A].push(function () {
                        (Q[I] = OA[A]), ++E === B.length && C(Q);
                      }));
                }),
                  0 === B.length && C(Q);
              }
              function gI(A, I, g) {
                if (((g = g || {}), !("argPackAdvance" in I)))
                  throw new TypeError(
                    "registerType registeredInstance requires argPackAdvance"
                  );
                var C = I.name;
                if (
                  (A ||
                    _A(
                      'type "' +
                        C +
                        '" must have a positive integer typeid pointer'
                    ),
                  OA.hasOwnProperty(A))
                ) {
                  if (g.ignoreDuplicateRegistrations) return;
                  _A("Cannot register type '" + C + "' twice");
                }
                if (((OA[A] = I), delete PA[A], VA.hasOwnProperty(A))) {
                  var Q = VA[A];
                  delete VA[A],
                    Q.forEach(function (A) {
                      A();
                    });
                }
              }
              function CI(A, I, g, C, Q) {
                var B = jA(g);
                gI(A, {
                  name: (I = ZA(I)),
                  fromWireType: function (A) {
                    return !!A;
                  },
                  toWireType: function (A, I) {
                    return I ? C : Q;
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: function (A) {
                    var C;
                    if (1 === g) C = j;
                    else if (2 === g) C = T;
                    else {
                      if (4 !== g)
                        throw new TypeError("Unknown boolean type size: " + I);
                      C = V;
                    }
                    return this.fromWireType(C[A >> B]);
                  },
                  destructorFunction: null,
                });
              }
              function QI(A) {
                if (!(this instanceof SI)) return !1;
                if (!(A instanceof SI)) return !1;
                for (
                  var I = this.$$.ptrType.registeredClass,
                    g = this.$$.ptr,
                    C = A.$$.ptrType.registeredClass,
                    Q = A.$$.ptr;
                  I.baseClass;

                )
                  (g = I.upcast(g)), (I = I.baseClass);
                for (; C.baseClass; ) (Q = C.upcast(Q)), (C = C.baseClass);
                return I === C && g === Q;
              }
              function BI(A) {
                return {
                  count: A.count,
                  deleteScheduled: A.deleteScheduled,
                  preservePointerOnDelete: A.preservePointerOnDelete,
                  ptr: A.ptr,
                  ptrType: A.ptrType,
                  smartPtr: A.smartPtr,
                  smartPtrType: A.smartPtrType,
                };
              }
              function EI(A) {
                _A(
                  A.$$.ptrType.registeredClass.name +
                    " instance already deleted"
                );
              }
              var DI = !1;
              function iI(A) {}
              function oI(A) {
                A.smartPtr
                  ? A.smartPtrType.rawDestructor(A.smartPtr)
                  : A.ptrType.registeredClass.rawDestructor(A.ptr);
              }
              function wI(A) {
                (A.count.value -= 1), 0 === A.count.value && oI(A);
              }
              function NI(A) {
                return "undefined" == typeof FinalizationGroup
                  ? ((NI = function (A) {
                      return A;
                    }),
                    A)
                  : ((DI = new FinalizationGroup(function (A) {
                      for (var I = A.next(); !I.done; I = A.next()) {
                        var g = I.value;
                        g.ptr
                          ? wI(g)
                          : console.warn("object already deleted: " + g.ptr);
                      }
                    })),
                    (iI = function (A) {
                      DI.unregister(A.$$);
                    }),
                    (NI = function (A) {
                      return DI.register(A, A.$$, A.$$), A;
                    })(A));
              }
              function RI() {
                if ((this.$$.ptr || EI(this), this.$$.preservePointerOnDelete))
                  return (this.$$.count.value += 1), this;
                var A = NI(
                  Object.create(Object.getPrototypeOf(this), {
                    $$: { value: BI(this.$$) },
                  })
                );
                return (A.$$.count.value += 1), (A.$$.deleteScheduled = !1), A;
              }
              function FI() {
                this.$$.ptr || EI(this),
                  this.$$.deleteScheduled &&
                    !this.$$.preservePointerOnDelete &&
                    _A("Object already scheduled for deletion"),
                  iI(this),
                  wI(this.$$),
                  this.$$.preservePointerOnDelete ||
                    ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
              }
              function GI() {
                return !this.$$.ptr;
              }
              var yI = void 0,
                sI = [];
              function hI() {
                for (; sI.length; ) {
                  var A = sI.pop();
                  (A.$$.deleteScheduled = !1), A.delete();
                }
              }
              function KI() {
                return (
                  this.$$.ptr || EI(this),
                  this.$$.deleteScheduled &&
                    !this.$$.preservePointerOnDelete &&
                    _A("Object already scheduled for deletion"),
                  sI.push(this),
                  1 === sI.length && yI && yI(hI),
                  (this.$$.deleteScheduled = !0),
                  this
                );
              }
              function MI() {
                (SI.prototype.isAliasOf = QI),
                  (SI.prototype.clone = RI),
                  (SI.prototype.delete = FI),
                  (SI.prototype.isDeleted = GI),
                  (SI.prototype.deleteLater = KI);
              }
              function SI() {}
              var kI = {};
              function aI(A, I, g) {
                if (void 0 === A[I].overloadTable) {
                  var C = A[I];
                  (A[I] = function () {
                    return (
                      A[I].overloadTable.hasOwnProperty(arguments.length) ||
                        _A(
                          "Function '" +
                            g +
                            "' called with an invalid number of arguments (" +
                            arguments.length +
                            ") - expects one of (" +
                            A[I].overloadTable +
                            ")!"
                        ),
                      A[I].overloadTable[arguments.length].apply(
                        this,
                        arguments
                      )
                    );
                  }),
                    (A[I].overloadTable = []),
                    (A[I].overloadTable[C.argCount] = C);
                }
              }
              function UI(A, I, g) {
                D.hasOwnProperty(A)
                  ? ((void 0 === g ||
                      (void 0 !== D[A].overloadTable &&
                        void 0 !== D[A].overloadTable[g])) &&
                      _A("Cannot register public name '" + A + "' twice"),
                    aI(D, A, A),
                    D.hasOwnProperty(g) &&
                      _A(
                        "Cannot register multiple overloads of a function with the same number of arguments (" +
                          g +
                          ")!"
                      ),
                    (D[A].overloadTable[g] = I))
                  : ((D[A] = I), void 0 !== g && (D[A].numArguments = g));
              }
              function JI(A, I, g, C, Q, B, E, D) {
                (this.name = A),
                  (this.constructor = I),
                  (this.instancePrototype = g),
                  (this.rawDestructor = C),
                  (this.baseClass = Q),
                  (this.getActualType = B),
                  (this.upcast = E),
                  (this.downcast = D),
                  (this.pureVirtualFunctions = []);
              }
              function YI(A, I, g) {
                for (; I !== g; )
                  I.upcast ||
                    _A(
                      "Expected null or instance of " +
                        g.name +
                        ", got an instance of " +
                        I.name
                    ),
                    (A = I.upcast(A)),
                    (I = I.baseClass);
                return A;
              }
              function LI(A, I) {
                if (null === I)
                  return (
                    this.isReference && _A("null is not a valid " + this.name),
                    0
                  );
                I.$$ || _A('Cannot pass "' + Gg(I) + '" as a ' + this.name),
                  I.$$.ptr ||
                    _A(
                      "Cannot pass deleted object as a pointer of type " +
                        this.name
                    );
                var g = I.$$.ptrType.registeredClass;
                return YI(I.$$.ptr, g, this.registeredClass);
              }
              function cI(A, I) {
                var g;
                if (null === I)
                  return (
                    this.isReference && _A("null is not a valid " + this.name),
                    this.isSmartPointer
                      ? ((g = this.rawConstructor()),
                        null !== A && A.push(this.rawDestructor, g),
                        g)
                      : 0
                  );
                I.$$ || _A('Cannot pass "' + Gg(I) + '" as a ' + this.name),
                  I.$$.ptr ||
                    _A(
                      "Cannot pass deleted object as a pointer of type " +
                        this.name
                    ),
                  !this.isConst &&
                    I.$$.ptrType.isConst &&
                    _A(
                      "Cannot convert argument of type " +
                        (I.$$.smartPtrType
                          ? I.$$.smartPtrType.name
                          : I.$$.ptrType.name) +
                        " to parameter type " +
                        this.name
                    );
                var C = I.$$.ptrType.registeredClass;
                if (
                  ((g = YI(I.$$.ptr, C, this.registeredClass)),
                  this.isSmartPointer)
                )
                  switch (
                    (void 0 === I.$$.smartPtr &&
                      _A("Passing raw pointer to smart pointer is illegal"),
                    this.sharingPolicy)
                  ) {
                    case 0:
                      I.$$.smartPtrType === this
                        ? (g = I.$$.smartPtr)
                        : _A(
                            "Cannot convert argument of type " +
                              (I.$$.smartPtrType
                                ? I.$$.smartPtrType.name
                                : I.$$.ptrType.name) +
                              " to parameter type " +
                              this.name
                          );
                      break;
                    case 1:
                      g = I.$$.smartPtr;
                      break;
                    case 2:
                      if (I.$$.smartPtrType === this) g = I.$$.smartPtr;
                      else {
                        var Q = I.clone();
                        (g = this.rawShare(
                          g,
                          Rg(function () {
                            Q.delete();
                          })
                        )),
                          null !== A && A.push(this.rawDestructor, g);
                      }
                      break;
                    default:
                      _A("Unsupporting sharing policy");
                  }
                return g;
              }
              function HI(A, I) {
                if (null === I)
                  return (
                    this.isReference && _A("null is not a valid " + this.name),
                    0
                  );
                I.$$ || _A('Cannot pass "' + Gg(I) + '" as a ' + this.name),
                  I.$$.ptr ||
                    _A(
                      "Cannot pass deleted object as a pointer of type " +
                        this.name
                    ),
                  I.$$.ptrType.isConst &&
                    _A(
                      "Cannot convert argument of type " +
                        I.$$.ptrType.name +
                        " to parameter type " +
                        this.name
                    );
                var g = I.$$.ptrType.registeredClass;
                return YI(I.$$.ptr, g, this.registeredClass);
              }
              function qI(A) {
                return this.fromWireType(O[A >> 2]);
              }
              function tI(A) {
                return this.rawGetPointee && (A = this.rawGetPointee(A)), A;
              }
              function rI(A) {
                this.rawDestructor && this.rawDestructor(A);
              }
              function dI(A) {
                null !== A && A.delete();
              }
              function nI(A, I, g) {
                if (I === g) return A;
                if (void 0 === g.baseClass) return null;
                var C = nI(A, I, g.baseClass);
                return null === C ? null : g.downcast(C);
              }
              function fI() {
                return Object.keys(WI).length;
              }
              function eI() {
                var A = [];
                for (var I in WI) WI.hasOwnProperty(I) && A.push(WI[I]);
                return A;
              }
              function xI(A) {
                (yI = A), sI.length && yI && yI(hI);
              }
              function lI() {
                (D.getInheritedInstanceCount = fI),
                  (D.getLiveInheritedInstances = eI),
                  (D.flushPendingDeletes = hI),
                  (D.setDelayFunction = xI);
              }
              var WI = {};
              function jI(A, I) {
                for (
                  void 0 === I && _A("ptr should not be undefined");
                  A.baseClass;

                )
                  (I = A.upcast(I)), (A = A.baseClass);
                return I;
              }
              function pI(A, I) {
                return (I = jI(A, I)), WI[I];
              }
              function TI(A, I) {
                return (
                  (I.ptrType && I.ptr) ||
                    AI("makeClassHandle requires ptr and ptrType"),
                  !!I.smartPtrType != !!I.smartPtr &&
                    AI("Both smartPtrType and smartPtr must be specified"),
                  (I.count = { value: 1 }),
                  NI(Object.create(A, { $$: { value: I } }))
                );
              }
              function ZI(A) {
                var I = this.getPointee(A);
                if (!I) return this.destructor(A), null;
                var g = pI(this.registeredClass, I);
                if (void 0 !== g) {
                  if (0 === g.$$.count.value)
                    return (g.$$.ptr = I), (g.$$.smartPtr = A), g.clone();
                  var C = g.clone();
                  return this.destructor(A), C;
                }
                function Q() {
                  return this.isSmartPointer
                    ? TI(this.registeredClass.instancePrototype, {
                        ptrType: this.pointeeType,
                        ptr: I,
                        smartPtrType: this,
                        smartPtr: A,
                      })
                    : TI(this.registeredClass.instancePrototype, {
                        ptrType: this,
                        ptr: A,
                      });
                }
                var B,
                  E = this.registeredClass.getActualType(I),
                  D = kI[E];
                if (!D) return Q.call(this);
                B = this.isConst ? D.constPointerType : D.pointerType;
                var i = nI(I, this.registeredClass, B.registeredClass);
                return null === i
                  ? Q.call(this)
                  : this.isSmartPointer
                  ? TI(B.registeredClass.instancePrototype, {
                      ptrType: B,
                      ptr: i,
                      smartPtrType: this,
                      smartPtr: A,
                    })
                  : TI(B.registeredClass.instancePrototype, {
                      ptrType: B,
                      ptr: i,
                    });
              }
              function VI() {
                (OI.prototype.getPointee = tI),
                  (OI.prototype.destructor = rI),
                  (OI.prototype.argPackAdvance = 8),
                  (OI.prototype.readValueFromPointer = qI),
                  (OI.prototype.deleteObject = dI),
                  (OI.prototype.fromWireType = ZI);
              }
              function OI(A, I, g, C, Q, B, E, D, i, o, w) {
                (this.name = A),
                  (this.registeredClass = I),
                  (this.isReference = g),
                  (this.isConst = C),
                  (this.isSmartPointer = Q),
                  (this.pointeeType = B),
                  (this.sharingPolicy = E),
                  (this.rawGetPointee = D),
                  (this.rawConstructor = i),
                  (this.rawShare = o),
                  (this.rawDestructor = w),
                  Q || void 0 !== I.baseClass
                    ? (this.toWireType = cI)
                    : C
                    ? ((this.toWireType = LI), (this.destructorFunction = null))
                    : ((this.toWireType = HI),
                      (this.destructorFunction = null));
              }
              function PI(A, I, g) {
                D.hasOwnProperty(A) ||
                  AI("Replacing nonexistant public symbol"),
                  void 0 !== D[A].overloadTable && void 0 !== g
                    ? (D[A].overloadTable[g] = I)
                    : ((D[A] = I), (D[A].argCount = g));
              }
              function mI(A, I, g) {
                var C = D["dynCall_" + A];
                return g && g.length
                  ? C.apply(null, [I].concat(g))
                  : C.call(null, I);
              }
              function bI(A, I, g) {
                return A.includes("j") ? mI(A, I, g) : QA.get(I).apply(null, g);
              }
              function uI(A, I) {
                var g = [];
                return function () {
                  g.length = arguments.length;
                  for (var C = 0; C < arguments.length; C++)
                    g[C] = arguments[C];
                  return bI(A, I, g);
                };
              }
              function XI(A, I) {
                var g = (A = ZA(A)).includes("j") ? uI(A, I) : QA.get(I);
                return (
                  "function" != typeof g &&
                    _A(
                      "unknown function pointer with signature " + A + ": " + I
                    ),
                  g
                );
              }
              var zI = void 0;
              function vI(A) {
                var I = AC(A),
                  g = ZA(I);
                return $g(I), g;
              }
              function _I(A, I) {
                var g = [],
                  C = {};
                throw (
                  (I.forEach(function A(I) {
                    C[I] ||
                      OA[I] ||
                      (PA[I] ? PA[I].forEach(A) : (g.push(I), (C[I] = !0)));
                  }),
                  new zI(A + ": " + g.map(vI).join([", "])))
                );
              }
              function $I(A, I, g, C, Q, B, E, D, i, o, w, N, R) {
                (w = ZA(w)),
                  (B = XI(Q, B)),
                  D && (D = XI(E, D)),
                  o && (o = XI(i, o)),
                  (R = XI(N, R));
                var F = uA(w);
                UI(F, function () {
                  _I("Cannot construct " + w + " due to unbound types", [C]);
                }),
                  II([A, I, g], C ? [C] : [], function (I) {
                    var g, Q;
                    (I = I[0]),
                      (Q = C
                        ? (g = I.registeredClass).instancePrototype
                        : SI.prototype);
                    var E = XA(F, function () {
                        if (Object.getPrototypeOf(this) !== i)
                          throw new vA("Use 'new' to construct " + w);
                        if (void 0 === N.constructor_body)
                          throw new vA(w + " has no accessible constructor");
                        var A = N.constructor_body[arguments.length];
                        if (void 0 === A)
                          throw new vA(
                            "Tried to invoke ctor of " +
                              w +
                              " with invalid number of parameters (" +
                              arguments.length +
                              ") - expected (" +
                              Object.keys(N.constructor_body).toString() +
                              ") parameters instead!"
                          );
                        return A.apply(this, arguments);
                      }),
                      i = Object.create(Q, { constructor: { value: E } });
                    E.prototype = i;
                    var N = new JI(w, E, i, R, g, B, D, o),
                      G = new OI(w, N, !0, !1, !1),
                      y = new OI(w + "*", N, !1, !1, !1),
                      s = new OI(w + " const*", N, !1, !0, !1);
                    return (
                      (kI[A] = { pointerType: y, constPointerType: s }),
                      PI(F, E),
                      [G, y, s]
                    );
                  });
              }
              function Ag(A, I) {
                for (var g = [], C = 0; C < A; C++) g.push(V[(I >> 2) + C]);
                return g;
              }
              function Ig(A) {
                for (; A.length; ) {
                  var I = A.pop();
                  A.pop()(I);
                }
              }
              function gg(A, I, g, C, Q, B) {
                r(I > 0);
                var E = Ag(I, g);
                Q = XI(C, Q);
                var D = [B],
                  i = [];
                II([], [A], function (A) {
                  var g = "constructor " + (A = A[0]).name;
                  if (
                    (void 0 === A.registeredClass.constructor_body &&
                      (A.registeredClass.constructor_body = []),
                    void 0 !== A.registeredClass.constructor_body[I - 1])
                  )
                    throw new vA(
                      "Cannot register multiple constructors with identical number of parameters (" +
                        (I - 1) +
                        ") for class '" +
                        A.name +
                        "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
                    );
                  return (
                    (A.registeredClass.constructor_body[I - 1] = function () {
                      _I(
                        "Cannot construct " + A.name + " due to unbound types",
                        E
                      );
                    }),
                    II([], E, function (C) {
                      return (
                        (A.registeredClass.constructor_body[I - 1] =
                          function () {
                            arguments.length !== I - 1 &&
                              _A(
                                g +
                                  " called with " +
                                  arguments.length +
                                  " arguments, expected " +
                                  (I - 1)
                              ),
                              (i.length = 0),
                              (D.length = I);
                            for (var A = 1; A < I; ++A)
                              D[A] = C[A].toWireType(i, arguments[A - 1]);
                            var B = Q.apply(null, D);
                            return Ig(i), C[0].fromWireType(B);
                          }),
                        []
                      );
                    }),
                    []
                  );
                });
              }
              function Cg(A, I) {
                if (!(A instanceof Function))
                  throw new TypeError(
                    "new_ called with constructor type " +
                      typeof A +
                      " which is not a function"
                  );
                var g = XA(A.name || "unknownFunctionName", function () {});
                g.prototype = A.prototype;
                var C = new g(),
                  Q = A.apply(C, I);
                return Q instanceof Object ? Q : C;
              }
              function Qg(A, I, g, C, Q) {
                var B = I.length;
                B < 2 &&
                  _A(
                    "argTypes array size mismatch! Must at least get return value and 'this' types!"
                  );
                for (
                  var E = null !== I[1] && null !== g, D = !1, i = 1;
                  i < I.length;
                  ++i
                )
                  if (null !== I[i] && void 0 === I[i].destructorFunction) {
                    D = !0;
                    break;
                  }
                var o = "void" !== I[0].name,
                  w = "",
                  N = "";
                for (i = 0; i < B - 2; ++i)
                  (w += (0 !== i ? ", " : "") + "arg" + i),
                    (N += (0 !== i ? ", " : "") + "arg" + i + "Wired");
                var R =
                  "return function " +
                  uA(A) +
                  "(" +
                  w +
                  ") {\nif (arguments.length !== " +
                  (B - 2) +
                  ") {\nthrowBindingError('function " +
                  A +
                  " called with ' + arguments.length + ' arguments, expected " +
                  (B - 2) +
                  " args!');\n}\n";
                D && (R += "var destructors = [];\n");
                var F = D ? "destructors" : "null",
                  G = [
                    "throwBindingError",
                    "invoker",
                    "fn",
                    "runDestructors",
                    "retType",
                    "classParam",
                  ],
                  y = [_A, C, Q, Ig, I[0], I[1]];
                for (
                  E &&
                    (R +=
                      "var thisWired = classParam.toWireType(" +
                      F +
                      ", this);\n"),
                    i = 0;
                  i < B - 2;
                  ++i
                )
                  (R +=
                    "var arg" +
                    i +
                    "Wired = argType" +
                    i +
                    ".toWireType(" +
                    F +
                    ", arg" +
                    i +
                    "); // " +
                    I[i + 2].name +
                    "\n"),
                    G.push("argType" + i),
                    y.push(I[i + 2]);
                if (
                  (E && (N = "thisWired" + (N.length > 0 ? ", " : "") + N),
                  (R +=
                    (o ? "var rv = " : "") +
                    "invoker(fn" +
                    (N.length > 0 ? ", " : "") +
                    N +
                    ");\n"),
                  D)
                )
                  R += "runDestructors(destructors);\n";
                else
                  for (i = E ? 1 : 2; i < I.length; ++i) {
                    var s = 1 === i ? "thisWired" : "arg" + (i - 2) + "Wired";
                    null !== I[i].destructorFunction &&
                      ((R += s + "_dtor(" + s + "); // " + I[i].name + "\n"),
                      G.push(s + "_dtor"),
                      y.push(I[i].destructorFunction));
                  }
                return (
                  o &&
                    (R += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
                  (R += "}\n"),
                  G.push(R),
                  Cg(Function, G).apply(null, y)
                );
              }
              function Bg(A, I, g, C, Q, B, E, D) {
                var i = Ag(g, C);
                (I = ZA(I)),
                  (B = XI(Q, B)),
                  II([], [A], function (A) {
                    var C = (A = A[0]).name + "." + I;
                    function Q() {
                      _I("Cannot call " + C + " due to unbound types", i);
                    }
                    D && A.registeredClass.pureVirtualFunctions.push(I);
                    var o = A.registeredClass.instancePrototype,
                      w = o[I];
                    return (
                      void 0 === w ||
                      (void 0 === w.overloadTable &&
                        w.className !== A.name &&
                        w.argCount === g - 2)
                        ? ((Q.argCount = g - 2),
                          (Q.className = A.name),
                          (o[I] = Q))
                        : (aI(o, I, C), (o[I].overloadTable[g - 2] = Q)),
                      II([], i, function (Q) {
                        var D = Qg(C, Q, A, B, E);
                        return (
                          void 0 === o[I].overloadTable
                            ? ((D.argCount = g - 2), (o[I] = D))
                            : (o[I].overloadTable[g - 2] = D),
                          []
                        );
                      }),
                      []
                    );
                  });
              }
              var Eg = [],
                Dg = [
                  {},
                  { value: void 0 },
                  { value: null },
                  { value: !0 },
                  { value: !1 },
                ];
              function ig(A) {
                A > 4 &&
                  0 == --Dg[A].refcount &&
                  ((Dg[A] = void 0), Eg.push(A));
              }
              function og() {
                for (var A = 0, I = 5; I < Dg.length; ++I)
                  void 0 !== Dg[I] && ++A;
                return A;
              }
              function wg() {
                for (var A = 5; A < Dg.length; ++A)
                  if (void 0 !== Dg[A]) return Dg[A];
                return null;
              }
              function Ng() {
                (D.count_emval_handles = og), (D.get_first_emval = wg);
              }
              function Rg(A) {
                switch (A) {
                  case void 0:
                    return 1;
                  case null:
                    return 2;
                  case !0:
                    return 3;
                  case !1:
                    return 4;
                  default:
                    var I = Eg.length ? Eg.pop() : Dg.length;
                    return (Dg[I] = { refcount: 1, value: A }), I;
                }
              }
              function Fg(A, I) {
                gI(A, {
                  name: (I = ZA(I)),
                  fromWireType: function (A) {
                    var I = Dg[A].value;
                    return ig(A), I;
                  },
                  toWireType: function (A, I) {
                    return Rg(I);
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: qI,
                  destructorFunction: null,
                });
              }
              function Gg(A) {
                if (null === A) return "null";
                var I = typeof A;
                return "object" === I || "array" === I || "function" === I
                  ? A.toString()
                  : "" + A;
              }
              function yg(A, I) {
                switch (I) {
                  case 2:
                    return function (A) {
                      return this.fromWireType(P[A >> 2]);
                    };
                  case 3:
                    return function (A) {
                      return this.fromWireType(m[A >> 3]);
                    };
                  default:
                    throw new TypeError("Unknown float type: " + A);
                }
              }
              function sg(A, I, g) {
                var C = jA(g);
                gI(A, {
                  name: (I = ZA(I)),
                  fromWireType: function (A) {
                    return A;
                  },
                  toWireType: function (A, I) {
                    if ("number" != typeof I && "boolean" != typeof I)
                      throw new TypeError(
                        'Cannot convert "' + Gg(I) + '" to ' + this.name
                      );
                    return I;
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: yg(I, C),
                  destructorFunction: null,
                });
              }
              function hg(A, I, g, C, Q, B) {
                var E = Ag(I, g);
                (A = ZA(A)),
                  (Q = XI(C, Q)),
                  UI(
                    A,
                    function () {
                      _I("Cannot call " + A + " due to unbound types", E);
                    },
                    I - 1
                  ),
                  II([], E, function (g) {
                    var C = [g[0], null].concat(g.slice(1));
                    return PI(A, Qg(A, C, null, Q, B), I - 1), [];
                  });
              }
              function Kg(A, I, g) {
                switch (I) {
                  case 0:
                    return g
                      ? function (A) {
                          return j[A];
                        }
                      : function (A) {
                          return p[A];
                        };
                  case 1:
                    return g
                      ? function (A) {
                          return T[A >> 1];
                        }
                      : function (A) {
                          return Z[A >> 1];
                        };
                  case 2:
                    return g
                      ? function (A) {
                          return V[A >> 2];
                        }
                      : function (A) {
                          return O[A >> 2];
                        };
                  default:
                    throw new TypeError("Unknown integer type: " + A);
                }
              }
              function Mg(A, I, g, C, Q) {
                (I = ZA(I)), -1 === Q && (Q = 4294967295);
                var B = jA(g),
                  E = function (A) {
                    return A;
                  };
                if (0 === C) {
                  var D = 32 - 8 * g;
                  E = function (A) {
                    return (A << D) >>> D;
                  };
                }
                var i = I.includes("unsigned");
                gI(A, {
                  name: I,
                  fromWireType: E,
                  toWireType: function (A, g) {
                    if ("number" != typeof g && "boolean" != typeof g)
                      throw new TypeError(
                        'Cannot convert "' + Gg(g) + '" to ' + this.name
                      );
                    if (g < C || g > Q)
                      throw new TypeError(
                        'Passing a number "' +
                          Gg(g) +
                          '" from JS side to C/C++ side to an argument of type "' +
                          I +
                          '", which is outside the valid range [' +
                          C +
                          ", " +
                          Q +
                          "]!"
                      );
                    return i ? g >>> 0 : 0 | g;
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: Kg(I, B, 0 !== C),
                  destructorFunction: null,
                });
              }
              function Sg(A, I, g) {
                var C = [
                  Int8Array,
                  Uint8Array,
                  Int16Array,
                  Uint16Array,
                  Int32Array,
                  Uint32Array,
                  Float32Array,
                  Float64Array,
                ][I];
                function Q(A) {
                  var I = O,
                    g = I[(A >>= 2)],
                    Q = I[A + 1];
                  return new C(W, Q, g);
                }
                gI(
                  A,
                  {
                    name: (g = ZA(g)),
                    fromWireType: Q,
                    argPackAdvance: 8,
                    readValueFromPointer: Q,
                  },
                  { ignoreDuplicateRegistrations: !0 }
                );
              }
              function kg(A, I) {
                var g = "std::string" === (I = ZA(I));
                gI(A, {
                  name: I,
                  fromWireType: function (A) {
                    var I,
                      C = O[A >> 2];
                    if (g)
                      for (var Q = A + 4, B = 0; B <= C; ++B) {
                        var E = A + 4 + B;
                        if (B == C || 0 == p[E]) {
                          var D = f(Q, E - Q);
                          void 0 === I
                            ? (I = D)
                            : ((I += String.fromCharCode(0)), (I += D)),
                            (Q = E + 1);
                        }
                      }
                    else {
                      var i = new Array(C);
                      for (B = 0; B < C; ++B)
                        i[B] = String.fromCharCode(p[A + 4 + B]);
                      I = i.join("");
                    }
                    return $g(A), I;
                  },
                  toWireType: function (A, I) {
                    I instanceof ArrayBuffer && (I = new Uint8Array(I));
                    var C = "string" == typeof I;
                    C ||
                      I instanceof Uint8Array ||
                      I instanceof Uint8ClampedArray ||
                      I instanceof Int8Array ||
                      _A("Cannot pass non-string to std::string");
                    var Q = (
                        g && C
                          ? function () {
                              return l(I);
                            }
                          : function () {
                              return I.length;
                            }
                      )(),
                      B = _g(4 + Q + 1);
                    if (((O[B >> 2] = Q), g && C)) x(I, B + 4, Q + 1);
                    else if (C)
                      for (var E = 0; E < Q; ++E) {
                        var D = I.charCodeAt(E);
                        D > 255 &&
                          ($g(B),
                          _A(
                            "String has UTF-16 code units that do not fit in 8 bits"
                          )),
                          (p[B + 4 + E] = D);
                      }
                    else for (E = 0; E < Q; ++E) p[B + 4 + E] = I[E];
                    return null !== A && A.push($g, B), B;
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: qI,
                  destructorFunction: function (A) {
                    $g(A);
                  },
                });
              }
              function ag(A, I, g) {
                var C, Q, B, E, D;
                (g = ZA(g)),
                  2 === I
                    ? ((C = u),
                      (Q = X),
                      (E = z),
                      (B = function () {
                        return Z;
                      }),
                      (D = 1))
                    : 4 === I &&
                      ((C = v),
                      (Q = _),
                      (E = $),
                      (B = function () {
                        return O;
                      }),
                      (D = 2)),
                  gI(A, {
                    name: g,
                    fromWireType: function (A) {
                      for (
                        var g, Q = O[A >> 2], E = B(), i = A + 4, o = 0;
                        o <= Q;
                        ++o
                      ) {
                        var w = A + 4 + o * I;
                        if (o == Q || 0 == E[w >> D]) {
                          var N = C(i, w - i);
                          void 0 === g
                            ? (g = N)
                            : ((g += String.fromCharCode(0)), (g += N)),
                            (i = w + I);
                        }
                      }
                      return $g(A), g;
                    },
                    toWireType: function (A, C) {
                      "string" != typeof C &&
                        _A("Cannot pass non-string to C++ string type " + g);
                      var B = E(C),
                        i = _g(4 + B + I);
                      return (
                        (O[i >> 2] = B >> D),
                        Q(C, i + 4, B + I),
                        null !== A && A.push($g, i),
                        i
                      );
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: qI,
                    destructorFunction: function (A) {
                      $g(A);
                    },
                  });
              }
              function Ug(A, I) {
                gI(A, {
                  isVoid: !0,
                  name: (I = ZA(I)),
                  argPackAdvance: 0,
                  fromWireType: function () {},
                  toWireType: function (A, I) {},
                });
              }
              function Jg(A) {
                A > 4 && (Dg[A].refcount += 1);
              }
              function Yg(A, I) {
                var g = OA[A];
                return void 0 === g && _A(I + " has unknown type " + vI(A)), g;
              }
              function Lg(A, I) {
                return Rg(
                  (A = Yg(A, "_emval_take_value")).readValueFromPointer(I)
                );
              }
              function cg() {
                MA();
              }
              function Hg(A, I, g) {
                p.copyWithin(A, I, I + g);
              }
              function qg(A) {
                try {
                  return (
                    H.grow((A - W.byteLength + 65535) >>> 16), CA(H.buffer), 1
                  );
                } catch (A) {}
              }
              function tg(A) {
                var I = p.length,
                  g = 2147483648;
                if ((A >>>= 0) > g) return !1;
                for (var C = 1; C <= 4; C *= 2) {
                  var Q = I * (1 + 0.2 / C);
                  if (
                    ((Q = Math.min(Q, A + 100663296)),
                    qg(Math.min(g, gA(Math.max(A, Q), 65536))))
                  )
                    return !0;
                }
                return !1;
              }
              var rg = {};
              function dg() {
                return N || "./this.program";
              }
              function ng() {
                if (!ng.strings) {
                  var A = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG:
                      (
                        ("object" == typeof navigator &&
                          navigator.languages &&
                          navigator.languages[0]) ||
                        "C"
                      ).replace("-", "_") + ".UTF-8",
                    _: dg(),
                  };
                  for (var I in rg) A[I] = rg[I];
                  var g = [];
                  for (var I in A) g.push(I + "=" + A[I]);
                  ng.strings = g;
                }
                return ng.strings;
              }
              function fg(A, I) {
                var g = 0;
                return (
                  ng().forEach(function (C, Q) {
                    var B = I + g;
                    (V[(A + 4 * Q) >> 2] = B), IA(C, B), (g += C.length + 1);
                  }),
                  0
                );
              }
              function eg(A, I) {
                var g = ng();
                V[A >> 2] = g.length;
                var C = 0;
                return (
                  g.forEach(function (A) {
                    C += A.length + 1;
                  }),
                  (V[I >> 2] = C),
                  0
                );
              }
              function xg(A) {
                CC(A);
              }
              function lg(A) {
                return 0;
              }
              function Wg(A, I, g, C) {
                var Q = fA.getStreamFromFD(A),
                  B = fA.doReadv(Q, I, g);
                return (V[C >> 2] = B), 0;
              }
              function jg(A, I, g, C, Q) {}
              function pg(A, I, g, C) {
                for (var Q = 0, B = 0; B < g; B++) {
                  for (
                    var E = V[(I + 8 * B) >> 2],
                      D = V[(I + (8 * B + 4)) >> 2],
                      i = 0;
                    i < D;
                    i++
                  )
                    fA.printChar(A, p[E + i]);
                  Q += D;
                }
                return (V[C >> 2] = Q), 0;
              }
              function Tg(A) {
                c(A);
              }
              function Zg(A) {
                return A % 4 == 0 && (A % 100 != 0 || A % 400 == 0);
              }
              function Vg(A, I) {
                for (var g = 0, C = 0; C <= I; g += A[C++]);
                return g;
              }
              var Og = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                Pg = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
              function mg(A, I) {
                for (var g = new Date(A.getTime()); I > 0; ) {
                  var C = Zg(g.getFullYear()),
                    Q = g.getMonth(),
                    B = (C ? Og : Pg)[Q];
                  if (!(I > B - g.getDate()))
                    return g.setDate(g.getDate() + I), g;
                  (I -= B - g.getDate() + 1),
                    g.setDate(1),
                    Q < 11
                      ? g.setMonth(Q + 1)
                      : (g.setMonth(0), g.setFullYear(g.getFullYear() + 1));
                }
                return g;
              }
              function bg(A, I, g, C) {
                var Q = V[(C + 40) >> 2],
                  B = {
                    tm_sec: V[C >> 2],
                    tm_min: V[(C + 4) >> 2],
                    tm_hour: V[(C + 8) >> 2],
                    tm_mday: V[(C + 12) >> 2],
                    tm_mon: V[(C + 16) >> 2],
                    tm_year: V[(C + 20) >> 2],
                    tm_wday: V[(C + 24) >> 2],
                    tm_yday: V[(C + 28) >> 2],
                    tm_isdst: V[(C + 32) >> 2],
                    tm_gmtoff: V[(C + 36) >> 2],
                    tm_zone: Q ? f(Q) : "",
                  },
                  E = f(g),
                  D = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y",
                  };
                for (var i in D) E = E.replace(new RegExp(i, "g"), D[i]);
                var o = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  w = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                function N(A, I, g) {
                  for (
                    var C = "number" == typeof A ? A.toString() : A || "";
                    C.length < I;

                  )
                    C = g[0] + C;
                  return C;
                }
                function R(A, I) {
                  return N(A, I, "0");
                }
                function F(A, I) {
                  function g(A) {
                    return A < 0 ? -1 : A > 0 ? 1 : 0;
                  }
                  var C;
                  return (
                    0 === (C = g(A.getFullYear() - I.getFullYear())) &&
                      0 === (C = g(A.getMonth() - I.getMonth())) &&
                      (C = g(A.getDate() - I.getDate())),
                    C
                  );
                }
                function G(A) {
                  switch (A.getDay()) {
                    case 0:
                      return new Date(A.getFullYear() - 1, 11, 29);
                    case 1:
                      return A;
                    case 2:
                      return new Date(A.getFullYear(), 0, 3);
                    case 3:
                      return new Date(A.getFullYear(), 0, 2);
                    case 4:
                      return new Date(A.getFullYear(), 0, 1);
                    case 5:
                      return new Date(A.getFullYear() - 1, 11, 31);
                    case 6:
                      return new Date(A.getFullYear() - 1, 11, 30);
                  }
                }
                function y(A) {
                  var I = mg(new Date(A.tm_year + 1900, 0, 1), A.tm_yday),
                    g = new Date(I.getFullYear(), 0, 4),
                    C = new Date(I.getFullYear() + 1, 0, 4),
                    Q = G(g),
                    B = G(C);
                  return F(Q, I) <= 0
                    ? F(B, I) <= 0
                      ? I.getFullYear() + 1
                      : I.getFullYear()
                    : I.getFullYear() - 1;
                }
                var s = {
                  "%a": function (A) {
                    return o[A.tm_wday].substring(0, 3);
                  },
                  "%A": function (A) {
                    return o[A.tm_wday];
                  },
                  "%b": function (A) {
                    return w[A.tm_mon].substring(0, 3);
                  },
                  "%B": function (A) {
                    return w[A.tm_mon];
                  },
                  "%C": function (A) {
                    return R(((A.tm_year + 1900) / 100) | 0, 2);
                  },
                  "%d": function (A) {
                    return R(A.tm_mday, 2);
                  },
                  "%e": function (A) {
                    return N(A.tm_mday, 2, " ");
                  },
                  "%g": function (A) {
                    return y(A).toString().substring(2);
                  },
                  "%G": function (A) {
                    return y(A);
                  },
                  "%H": function (A) {
                    return R(A.tm_hour, 2);
                  },
                  "%I": function (A) {
                    var I = A.tm_hour;
                    return 0 == I ? (I = 12) : I > 12 && (I -= 12), R(I, 2);
                  },
                  "%j": function (A) {
                    return R(
                      A.tm_mday +
                        Vg(Zg(A.tm_year + 1900) ? Og : Pg, A.tm_mon - 1),
                      3
                    );
                  },
                  "%m": function (A) {
                    return R(A.tm_mon + 1, 2);
                  },
                  "%M": function (A) {
                    return R(A.tm_min, 2);
                  },
                  "%n": function () {
                    return "\n";
                  },
                  "%p": function (A) {
                    return A.tm_hour >= 0 && A.tm_hour < 12 ? "AM" : "PM";
                  },
                  "%S": function (A) {
                    return R(A.tm_sec, 2);
                  },
                  "%t": function () {
                    return "\t";
                  },
                  "%u": function (A) {
                    return A.tm_wday || 7;
                  },
                  "%U": function (A) {
                    var I = new Date(A.tm_year + 1900, 0, 1),
                      g = 0 === I.getDay() ? I : mg(I, 7 - I.getDay()),
                      C = new Date(A.tm_year + 1900, A.tm_mon, A.tm_mday);
                    if (F(g, C) < 0) {
                      var Q =
                          Vg(Zg(C.getFullYear()) ? Og : Pg, C.getMonth() - 1) -
                          31,
                        B = 31 - g.getDate() + Q + C.getDate();
                      return R(Math.ceil(B / 7), 2);
                    }
                    return 0 === F(g, I) ? "01" : "00";
                  },
                  "%V": function (A) {
                    var I,
                      g = new Date(A.tm_year + 1900, 0, 4),
                      C = new Date(A.tm_year + 1901, 0, 4),
                      Q = G(g),
                      B = G(C),
                      E = mg(new Date(A.tm_year + 1900, 0, 1), A.tm_yday);
                    return F(E, Q) < 0
                      ? "53"
                      : F(B, E) <= 0
                      ? "01"
                      : ((I =
                          Q.getFullYear() < A.tm_year + 1900
                            ? A.tm_yday + 32 - Q.getDate()
                            : A.tm_yday + 1 - Q.getDate()),
                        R(Math.ceil(I / 7), 2));
                  },
                  "%w": function (A) {
                    return A.tm_wday;
                  },
                  "%W": function (A) {
                    var I = new Date(A.tm_year, 0, 1),
                      g =
                        1 === I.getDay()
                          ? I
                          : mg(I, 0 === I.getDay() ? 1 : 7 - I.getDay() + 1),
                      C = new Date(A.tm_year + 1900, A.tm_mon, A.tm_mday);
                    if (F(g, C) < 0) {
                      var Q =
                          Vg(Zg(C.getFullYear()) ? Og : Pg, C.getMonth() - 1) -
                          31,
                        B = 31 - g.getDate() + Q + C.getDate();
                      return R(Math.ceil(B / 7), 2);
                    }
                    return 0 === F(g, I) ? "01" : "00";
                  },
                  "%y": function (A) {
                    return (A.tm_year + 1900).toString().substring(2);
                  },
                  "%Y": function (A) {
                    return A.tm_year + 1900;
                  },
                  "%z": function (A) {
                    var I = A.tm_gmtoff,
                      g = I >= 0;
                    return (
                      (I = ((I = Math.abs(I) / 60) / 60) * 100 + (I % 60)),
                      (g ? "+" : "-") + String("0000" + I).slice(-4)
                    );
                  },
                  "%Z": function (A) {
                    return A.tm_zone;
                  },
                  "%%": function () {
                    return "%";
                  },
                };
                for (var i in s)
                  E.includes(i) && (E = E.replace(new RegExp(i, "g"), s[i](B)));
                var h = Xg(E, !1);
                return h.length > I ? 0 : (AA(h, A), h.length - 1);
              }
              function ug(A, I, g, C) {
                return bg(A, I, g, C);
              }
              function Xg(A, I, g) {
                var C = g > 0 ? g : l(A) + 1,
                  Q = new Array(C),
                  B = e(A, Q, 0, Q.length);
                return I && (Q.length = B), Q;
              }
              pA(),
                (vA = D.BindingError = zA(Error, "BindingError")),
                ($A = D.InternalError = zA(Error, "InternalError")),
                MI(),
                VI(),
                lI(),
                (zI = D.UnboundTypeError = zA(Error, "UnboundTypeError")),
                Ng();
              var zg,
                vg = {
                  c: rA,
                  d: nA,
                  o: eA,
                  C: xA,
                  D: lA,
                  v: WA,
                  F: CI,
                  f: $I,
                  i: gg,
                  a: Bg,
                  E: Fg,
                  q: sg,
                  b: hg,
                  g: Mg,
                  e: Sg,
                  r: kg,
                  k: ag,
                  G: Ug,
                  s: ig,
                  t: Jg,
                  h: Lg,
                  m: cg,
                  w: Hg,
                  x: tg,
                  z: fg,
                  A: eg,
                  l: xg,
                  p: lg,
                  B: Wg,
                  u: jg,
                  n: pg,
                  j: Tg,
                  y: ug,
                },
                _g =
                  (LA(),
                  (D.___wasm_call_ctors = function () {
                    return (D.___wasm_call_ctors = D.asm.I).apply(
                      null,
                      arguments
                    );
                  }),
                  (D._malloc = function () {
                    return (_g = D._malloc = D.asm.J).apply(null, arguments);
                  })),
                $g = (D._free = function () {
                  return ($g = D._free = D.asm.K).apply(null, arguments);
                }),
                AC = (D.___getTypeName = function () {
                  return (AC = D.___getTypeName = D.asm.M).apply(
                    null,
                    arguments
                  );
                });
              function IC(A) {
                (this.name = "ExitStatus"),
                  (this.message = "Program terminated with exit(" + A + ")"),
                  (this.status = A);
              }
              function gC(A) {
                function g() {
                  zg ||
                    ((zg = !0),
                    (D.calledRun = !0),
                    t ||
                      (oA(),
                      I(D),
                      D.onRuntimeInitialized && D.onRuntimeInitialized(),
                      wA()));
                }
                (A = A || w),
                  GA > 0 ||
                    (iA(),
                    GA > 0 ||
                      (D.setStatus
                        ? (D.setStatus("Running..."),
                          setTimeout(function () {
                            setTimeout(function () {
                              D.setStatus("");
                            }, 1),
                              g();
                          }, 1))
                        : g()));
              }
              function CC(A, I) {
                (I && qA() && 0 === A) ||
                  (qA() || (D.onExit && D.onExit(A), (t = !0)),
                  R(A, new IC(A)));
              }
              if (
                ((D.___embind_register_native_and_builtin_types = function () {
                  return (D.___embind_register_native_and_builtin_types =
                    D.asm.N).apply(null, arguments);
                }),
                (D.dynCall_viijii = function () {
                  return (D.dynCall_viijii = D.asm.O).apply(null, arguments);
                }),
                (D.dynCall_viiij = function () {
                  return (D.dynCall_viiij = D.asm.P).apply(null, arguments);
                }),
                (D.dynCall_viiiij = function () {
                  return (D.dynCall_viiiij = D.asm.Q).apply(null, arguments);
                }),
                (D.dynCall_ji = function () {
                  return (D.dynCall_ji = D.asm.R).apply(null, arguments);
                }),
                (D.dynCall_vij = function () {
                  return (D.dynCall_vij = D.asm.S).apply(null, arguments);
                }),
                (D.dynCall_jiii = function () {
                  return (D.dynCall_jiii = D.asm.T).apply(null, arguments);
                }),
                (D.dynCall_viiji = function () {
                  return (D.dynCall_viiji = D.asm.U).apply(null, arguments);
                }),
                (D.dynCall_jiji = function () {
                  return (D.dynCall_jiji = D.asm.V).apply(null, arguments);
                }),
                (D.dynCall_iiiiij = function () {
                  return (D.dynCall_iiiiij = D.asm.W).apply(null, arguments);
                }),
                (D.dynCall_iiiiijj = function () {
                  return (D.dynCall_iiiiijj = D.asm.X).apply(null, arguments);
                }),
                (D.dynCall_iiiiiijj = function () {
                  return (D.dynCall_iiiiiijj = D.asm.Y).apply(null, arguments);
                }),
                (sA = function A() {
                  zg || gC(), zg || (sA = A);
                }),
                (D.run = gC),
                D.preInit)
              )
                for (
                  "function" == typeof D.preInit && (D.preInit = [D.preInit]);
                  D.preInit.length > 0;

                )
                  D.preInit.pop()();
              return gC(), A.ready;
            });
        A.exports = Q;
      },
      351: () => {},
    },
    I = {};
  function g(C) {
    var Q = I[C];
    if (void 0 !== Q) return Q.exports;
    var B = (I[C] = { exports: {} });
    return A[C](B, B.exports, g), B.exports;
  }
  (g.n = (A) => {
    var I = A && A.__esModule ? () => A.default : () => A;
    return g.d(I, { a: I }), I;
  }),
    (g.d = (A, I) => {
      for (var C in I)
        g.o(I, C) &&
          !g.o(A, C) &&
          Object.defineProperty(A, C, { enumerable: !0, get: I[C] });
    }),
    (g.o = (A, I) => Object.prototype.hasOwnProperty.call(A, I)),
    (() => {
      "use strict";
      var A = g(93),
        I = g.n(A);
      class C {
        constructor(A, I) {
          (this.pvalues = I.constructor.parseVecDouble(A.significances())),
            (this.clusters = I.constructor.parseVecInt(A.clusters())),
            (this.lisaValues = I.constructor.parseVecDouble(A.lisa_values())),
            (this.neighbors = I.constructor.parseVecInt(A.nn())),
            (this.labels = I.constructor.parseVecString(A.labels())),
            (this.colors = I.constructor.parseVecString(A.colors()));
        }
        getPValues() {
          return this.pvalues;
        }
        getClusters() {
          return this.clusters;
        }
        getLisaValues() {
          return this.lisaValues;
        }
        getNeighbors() {
          return this.neighbors;
        }
        getLabels() {
          return this.neighbors;
        }
        getColors() {
          return this.colors;
        }
      }
      class Q {
        constructor(A) {
          (this.isValid = A.get_is_valid()),
            (this.uid = A.get_uid()),
            (this.mapUid = A.get_map_uid()),
            (this.weightType = A.get_weight_type()),
            (this.isSymmetric = A.get_is_symmetric()),
            (this.numObs = A.get_num_obs()),
            (this.sparsity = A.get_sparsity()),
            (this.maxNeighbors = A.get_max_nbrs()),
            (this.minNeighbors = A.get_min_nbrs()),
            (this.meanNeighbors = A.get_mean_nbrs()),
            (this.medianNeighbors = A.get_median_nbrs());
        }
        getMapUid() {
          return this.mapUid;
        }
        getUid() {
          return this.uid;
        }
      }
      class B {
        constructor(A) {
          (this.version = "0.0.8"), (this.wasm = A), (this.geojson_maps = {});
        }
        static generateUid() {
          const A = [],
            I =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            g = I.length;
          for (let C = 0; C < 12; C += 1)
            A.push(I.charAt(Math.floor(Math.random() * g)));
          return `map-${A.join("")}`;
        }
        readGeoJSON(A) {
          const I = B.generateUid(),
            g = new Uint8Array(A),
            C = this.wasm._malloc(g.length);
          this.wasm.HEAPU8.set(g, C),
            this.wasm.new_geojsonmap(I, C, g.length),
            this.wasm._free(C);
          const Q = this.wasm.get_map_type(I);
          return (this.geojson_maps[I] = Q), I;
        }
        read_geojson(A) {
          return this.readGeoJSON(A);
        }
        getMapType(A) {
          return this.has(A)
            ? this.geojson_maps[A]
            : (console.log("mapUid is not recognized: ", A), -1);
        }
        has(A) {
          return A in this.geojson_maps;
        }
        free() {
          this.wasm.free_geojsonmap();
        }
        checkMapUid(A) {
          return (
            !!this.has(A) || (console.log("mapUid is not recognized: ", A), !1)
          );
        }
        getBounds(A) {
          if (!this.checkMapUid(A)) return null;
          const I = this.wasm.get_bounds(A);
          return B.parseVecDouble(I);
        }
        getViewport(A, I, g) {
          if (!this.checkMapUid(A)) return null;
          const C = this.getBounds(A);
          function Q(A) {
            const I = Math.sin((A * Math.PI) / 180),
              g = Math.log((1 + I) / (1 - I)) / 2;
            return Math.max(Math.min(g, Math.PI), -Math.PI) / 2;
          }
          function B(A, I, g) {
            return Math.floor(Math.log(A / I / g) / Math.LN2);
          }
          const E = { lng: C[1], lat: C[2] },
            D = { lng: C[0], lat: C[3] },
            i = Math.abs(Q(E.lat) - Q(D.lat)) / Math.PI,
            o = E.lng - D.lng,
            w = (o < 0 ? o + 360 : o) / 360,
            N = Math.min(I, g),
            R = B(N, 256, i),
            F = B(N, 256, w),
            G = Math.min(R, F, 21);
          return {
            longitude: (C[0] + C[1]) / 2,
            latitude: (C[2] + C[3]) / 2,
            zoom: G - 1,
          };
        }
        getCentroids(A) {
          if (!this.checkMapUid(A)) return null;
          const I = this.wasm.get_centroids(A),
            g = I.get_x(),
            C = I.get_y(),
            Q = [];
          for (let A = 0; A < g.size(); A += 1) Q.push([g.get(A), C.get(A)]);
          return Q;
        }
        getNumberObservations(A) {
          return this.checkMapUid(A) ? this.wasm.get_num_obs(A) : null;
        }
        getNumObs(A) {
          return this.getNumberObservations(A);
        }
        get_numobs(A) {
          return this.getNumberObservations(A);
        }
        getColumnNames(A) {
          const I = this.wasm.get_col_names(A);
          return B.parseVecString(I);
        }
        get_colnames(A) {
          return this.getColumnNames(A);
        }
        getColumn(A, I) {
          if (!this.checkMapUid(A)) return null;
          if (this.wasm.is_numeric_col) {
            const g = this.wasm.get_numeric_col(A, I);
            return B.parseVecDouble(g);
          }
          const g = this.wasm.get_string_col(A, I);
          return B.parseVecString(g);
        }
        getCol(A, I) {
          return this.getColumn(A, I);
        }
        get_col(A, I) {
          return this.getColumn(A, I);
        }
        getRookWeights(A, I, g, C) {
          if (!this.checkMapUid(A)) return null;
          null == I && (I = 1), null == g && (g = !1), null == C && (C = 0);
          const B = this.wasm.rook_weights(A, I, g, C);
          return new Q(B);
        }
        getQueenWeights(A, I, g, C) {
          if (!this.checkMapUid(A)) return null;
          null == I && (I = 1), null == g && (g = !1), null == C && (C = 0);
          const B = this.wasm.queen_weights(A, I, g, C);
          return new Q(B);
        }
        getMinDistanceThreshold(A, I, g) {
          return this.checkMapUid(A)
            ? (null == I && (I = !1),
              null == g && (g = !0),
              this.wasm.min_distance_threshold(A, I, g))
            : null;
        }
        getKnnWeights(A, I, g, C, B, E) {
          if (!this.checkMapUid(A)) return null;
          null == g && (g = 1),
            null == C && (C = !1),
            null == B && (B = !1),
            null == E && (E = !0);
          const D = this.wasm.knn_weights(A, I, g, C, B, E);
          return new Q(D);
        }
        getDistanceWeights(A, I, g, C, B, E) {
          if (!this.checkMapUid(A)) return null;
          null == g && (g = 1),
            null == C && (C = !1),
            null == B && (B = !1),
            null == E && (E = !0);
          const D = this.wasm.dist_weights(A, I, g, C, B, E);
          return new Q(D);
        }
        getKernelKnnWeights(A, I, g, C, E, D, i, o, w) {
          if (!this.checkMapUid(A)) return null;
          if (!B.checkInputKernel(g)) return null;
          null == E && (E = !1),
            null == D && (D = 1),
            null == i && (i = !1),
            null == o && (o = !1),
            null == w && (w = !0);
          const N = this.wasm.kernel_weights(A, I, g, C, E, D, i, o, w);
          return new Q(N);
        }
        static checkInputKernel(A) {
          return (
            A in
              {
                triangular: !0,
                uniform: !0,
                epanechnikov: !0,
                quartic: !0,
                gaussian: !0,
              } ||
            (console.log(
              "kernel has to be one of  {'triangular', 'uniform', 'epanechnikov', 'quartic', 'gaussian'}"
            ),
            !1)
          );
        }
        getKernelWeights(A, I, g, C, E, D, i, o) {
          if (!this.checkMapUid(A)) return null;
          if (!B.checkInputKernel(g)) return null;
          null === C && (C = !1),
            null == E && (E = 1),
            null == D && (D = !1),
            null == i && (i = !1),
            null == o && (o = !0);
          const w = this.wasm.kernel_bandwidth_weights(A, I, g, C, E, D, i, o);
          return new Q(w);
        }
        getNeighbors(A, I) {
          const g = A.getMapUid(),
            C = A.getUid(),
            Q = this.wasm.get_neighbors(g, C, I);
          return B.parseVecInt(Q);
        }
        getConnectivity(A) {
          const I = A.getMapUid(),
            g = this.getCentroids(I),
            C = this.getNumberObservations(I),
            Q = [],
            B = [],
            E = [];
          for (let I = 0; I < C; I += 1) {
            const C = this.getNeighbors(A, I);
            for (let A = 0; A < C.length; A += 1) {
              const B = C[A];
              E.push({
                position: g[B],
                target: g[I],
                name: String(A),
                radius: 1,
                gain: 0,
              }),
                Q.push({ target: g[I], source: g[B], value: 3 });
            }
            B.push({ position: g[I], name: String(I) });
          }
          return { arcs: Q, targets: B, sources: E };
        }
        static isInt(A) {
          return Number(A) === A && A % 1 == 0;
        }
        static parseVecInt(A) {
          const I = [];
          for (let g = 0; g < A.size(); g += 1) I.push(A.get(g));
          return I;
        }
        static parseVecVecInt(A) {
          const I = [];
          for (let g = 0; g < A.size(); g += 1) {
            const C = [],
              Q = A.get(g);
            for (let A = 0; A < Q.size(); A += 1) C.push(Q.get(A));
            I.push(C);
          }
          return I;
        }
        static parseVecVecDouble(A) {
          const I = [];
          for (let g = 0; g < A.size(); g += 1) {
            const C = [],
              Q = A.get(g);
            for (let A = 0; A < Q.size(); A += 1) C.push(Q.get(A));
            I.push(C);
          }
          return I;
        }
        static parseVecDouble(A) {
          const I = [];
          for (let g = 0; g < A.size(); g += 1) I.push(A.get(g));
          return I;
        }
        static parseVecString(A) {
          const I = [];
          for (let g = 0; g < A.size(); g += 1) I.push(A.get(g));
          return I;
        }
        toVecString(A) {
          const I = new this.wasm.VectorString();
          for (let g = 0; g < A.length; g += 1) I.push_back(A[g]);
          return I;
        }
        toVecInt(A) {
          const I = new this.wasm.VectorInt();
          for (let g = 0; g < A.length; g += 1) I.push_back(A[g]);
          return I;
        }
        toVecDouble(A) {
          const I = new this.wasm.VectorDouble();
          for (let g = 0; g < A.length; g += 1)
            Number.isNaN(A[g]) || A[g] === 1 / 0
              ? I.push_back(0)
              : I.push_back(A[g]);
          return I;
        }
        toVecVecDouble(A) {
          const I = new this.wasm.VecVecDouble(),
            g = new this.wasm.VecVecInt();
          for (let C = 0; C < A.length; C += 1) {
            const Q = new this.wasm.VectorDouble(),
              B = new this.wasm.VectorInt();
            for (let I = 0; I < A[C].length; I += 1)
              Number.isNaN(A[C][I]) || A[C][I] === 1 / 0
                ? (Q.push_back(0), B.push_back(1))
                : (Q.push_back(A[C][I]), B.push_back(0));
            I.push_back(Q), g.push_back(B);
          }
          return { values: I, undefs: g };
        }
        naturalBreaks(A, I) {
          const g = I.map((A) => Number.isNaN(A)),
            C = this.wasm.natural_breaks(
              A,
              this.toVecDouble(I),
              this.toVecInt(g)
            );
          return B.parseVecDouble(C);
        }
        natural_breaks(A, I) {
          return this.naturalBreaks(A, I);
        }
        quantileBreaks(A, I) {
          const g = I.map((A) => Number.isNaN(A)),
            C = this.wasm.quantile_breaks(
              A,
              this.toVecDouble(I),
              this.toVecInt(g)
            );
          return B.parseVecDouble(C);
        }
        quantile_breaks(A, I) {
          return this.quantileBreaks(A, I);
        }
        percentileBreaks(A) {
          const I = A.map((A) => Number.isNaN(A)),
            g = this.wasm.percentile_breaks(
              this.toVecDouble(A),
              this.toVecInt(I)
            );
          return B.parseVecDouble(g);
        }
        standardDeviationBreaks(A) {
          const I = A.map((A) => Number.isNaN(A)),
            g = this.wasm.stddev_breaks(this.toVecDouble(A), this.toVecInt(I));
          return B.parseVecDouble(g);
        }
        stddev_breaks(A) {
          return this.standardDeviationBreaks(A);
        }
        hinge15Breaks(A) {
          const I = A.map((A) => Number.isNaN(A)),
            g = this.wasm.hinge15_breaks(this.toVecDouble(A), this.toVecInt(I));
          return B.parseVecDouble(g);
        }
        hinge15_breaks(A) {
          return this.hinge15Breaks(A);
        }
        hinge30Breaks(A) {
          const I = A.map((A) => Number.isNaN(A)),
            g = this.wasm.hinge30_breaks(this.toVecDouble(A), this.toVecInt(I));
          return B.parseVecDouble(g);
        }
        hinge30_breaks(A) {
          return this.hinge30Breaks(A);
        }
        customBreaks(A, I, g) {
          let C = [];
          if ("naturalBreaks" === A) C = this.naturalBreaks(g, I);
          else if ("quantileBreaks" === A) C = this.quantileBreaks(g, I);
          else if ("percentileBreaks" === A) C = this.percentileBreaks(I);
          else if ("standardDeviationBreaks" === A)
            C = this.standardDeviationBreaks(I);
          else if ("hinge15Breaks" === A) C = this.hinge15Breaks(I);
          else {
            if ("hinge30Breaks" !== A) return null;
            C = this.hinge30Breaks(I);
          }
          const Q = C,
            E = [],
            D = [];
          for (let A = 0; A < C.length; A += 1) {
            D.push([]);
            const I = B.isInt(C[A]) ? C[A] : C[A].toFixed(2);
            E.push(`${I}`);
          }
          D.push([]);
          let i = C[C.length - 1];
          void 0 !== i &&
            ((i = B.isInt(i) ? i : i.toFixed(2)), E.push(`> ${i}`)),
            C.unshift(Number.NEGATIVE_INFINITY),
            C.push(Number.POSITIVE_INFINITY);
          for (let A = 0; A < I.length; A += 1) {
            const g = I[A];
            for (let I = 0; I < C.length - 1; I += 1) {
              const Q = C[I],
                B = C[I + 1];
              if (g >= Q && g < B) {
                D[I].push(A);
                break;
              }
            }
          }
          return { k: g, bins: E, breaks: Q, id_array: D };
        }
        excessRisk(A, I) {
          const g = this.wasm.excess_risk(
            this.toVecDouble(A),
            this.toVecDouble(I)
          );
          return B.parseVecDouble(g);
        }
        empiricalBayesRisk(A, I) {
          const g = this.wasm.eb_risk(this.toVecDouble(A), this.toVecDouble(I));
          return B.parseVecDouble(g);
        }
        spatialLag(A, I, g, C, Q) {
          const E = A.getMapUid(),
            D = A.getUid(),
            i = this.toVecDouble(I);
          null == g && (g = !0), null == C && (C = !0), null == Q && (Q = !1);
          const o = this.wasm.spatial_lag(E, D, i, g, C, Q);
          return B.parseVecDouble(o);
        }
        spatialRate(A, I, g) {
          const C = A.getMapUid(),
            Q = A.getUid(),
            E = this.wasm.spatial_rate(
              this.toVecDouble(I),
              this.toVecDouble(g),
              C,
              Q
            );
          return B.parseVecDouble(E);
        }
        spatialEmpiricalBayes(A, I, g) {
          const C = A.getMapUid(),
            Q = A.getUid(),
            E = this.wasm.spatial_eb(
              this.toVecDouble(I),
              this.toVecDouble(g),
              C,
              Q
            );
          return B.parseVecDouble(E);
        }
        cartogram(A, I) {
          const g = this.wasm.cartogram(A, this.toVecDouble(I)),
            C = g.get_x(),
            Q = g.get_y(),
            B = g.get_radius();
          let E = C.get(0),
            D = C.get(0),
            i = Q.get(0),
            o = Q.get(0);
          for (let A = 0; A < C.size(); A += 1)
            E > C.get(A) && (E = C.get(A)),
              D < C.get(A) && (D = C.get(A)),
              i > Q.get(A) && (i = Q.get(A)),
              o < Q.get(A) && (o = Q.get(A));
          const w = [];
          for (let A = 0; A < C.size(); A += 1)
            w.push({
              properties: { id: A },
              position: [C.get(A) / 1e4, Q.get(A) / 1e4],
              radius: B.get(A),
            });
          return w;
        }
        localMoran(A, I, g, C, Q, B) {
          return this.callLisa("localMoran", A, I, g, C, Q, B);
        }
        localG(A, I, g, C, Q, B) {
          return this.callLisa("localG", A, I, g, C, Q, B);
        }
        localGStar(A, I, g, C, Q, B) {
          return this.callLisa("localGStar", A, I, g, C, Q, B);
        }
        localGeary(A, I, g, C, Q, B) {
          return this.callLisa("localGeary", A, I, g, C, Q, B);
        }
        localJoinCount(A, I, g, C, Q, B) {
          return this.callLisa("localJoinCount", A, I, g, C, Q, B);
        }
        quantileLisa(A, I, g, Q, B, E, D, i) {
          const o = A.getMapUid(),
            w = A.getUid();
          if (
            (null == B && (B = 999),
            null == E && (E = "lookup"),
            null == D && (D = 0.05),
            null == i && (i = 123456789),
            !(E in { lookup: !0, complete: !0 }))
          )
            return (
              console.log(
                "Permutation method needs to be one of {'lookup', 'complete'}."
              ),
              null
            );
          const N = Q.map((A) => Number.isNaN(A)),
            R = this.toVecInt(N),
            F = this.toVecDouble(Q),
            G = this.wasm.quantile_lisa(o, w, I, g, F, R, D, B, E, i);
          return null !== G ? new C(G, this) : null;
        }
        callLisa(A, I, g, Q, B, E, D) {
          const i = I.getMapUid(),
            o = I.getUid();
          if (
            (null == Q && (Q = 999),
            null == B && (B = "lookup"),
            null == E && (E = 0.05),
            null == D && (D = 123456789),
            !(B in { lookup: !0, complete: !0 }))
          )
            return (
              console.log(
                "Permutation method needs to be one of {'lookup', 'complete'}."
              ),
              null
            );
          const w = g.map((A) => Number.isNaN(A)),
            N = this.toVecInt(w),
            R = this.toVecDouble(g);
          let F = null;
          if ("localMoran" === A)
            F = this.wasm.local_moran(i, o, R, N, E, Q, B, D);
          else if ("localG" === A)
            F = this.wasm.local_g(i, o, R, N, E, Q, B, D);
          else if ("localGStar" === A)
            F = this.wasm.local_gstar(i, o, R, N, E, Q, B, D);
          else if ("localGeary" === A)
            F = this.wasm.local_geary(i, o, R, N, E, Q, B, D);
          else {
            if ("localJoinCount" !== A)
              return console.log("lisaFunction is not valid: ", A), null;
            F = this.wasm.local_joincount(i, o, R, N, E, Q, B, D);
          }
          return new C(F, this);
        }
        static scaleMethods() {
          return {
            raw: !0,
            standardize: !0,
            demean: !0,
            mad: !0,
            range_standardize: !0,
            range_adjust: !0,
          };
        }
        static distanceMethods() {
          return { euclidean: !0, manhattan: !0 };
        }
        neighborMatchTest(A, I, g, C, Q, E, D, i, o) {
          if ((null == C && (C = "standardize"), !(C in B.scaleMethods())))
            return console.log("The scaling method is not valid."), null;
          if ((null == Q && (Q = "euclidean"), !(Q in B.distanceMethods())))
            return console.log("The distance method is not valid."), null;
          null == E && (E = 1),
            null == D && (D = !1),
            null == i && (i = !1),
            null == o && (o = !0);
          const w = this.toVecVecDouble(g),
            N = this.wasm.neighbor_match_test(A, I, E, D, i, o, w.values, C, Q),
            R = B.parseVecVecDouble(N);
          return { cardinality: R[0], probability: R[1] };
        }
        localMultiGeary(A, I, g, Q, B, E) {
          const D = A.getMapUid(),
            i = A.getUid();
          if (
            (null == g && (g = 999),
            null == Q && (Q = "lookup"),
            null == B && (B = 0.05),
            null == E && (E = 123456789),
            !(Q in { lookup: !0, complete: !0 }))
          )
            return (
              console.log(
                "Permutation method needs to be one of {'lookup', 'complete'}."
              ),
              null
            );
          const o = this.toVecVecDouble(I),
            w = this.wasm.local_multigeary(
              D,
              i,
              o.values,
              o.undefs,
              B,
              g,
              Q,
              E
            );
          return null !== w ? new C(w, this) : null;
        }
        localBiJoinCount(A, I, g, Q, B, E, D) {
          const i = A.getMapUid(),
            o = A.getUid();
          if (
            (null == Q && (Q = 999),
            null == B && (B = "lookup"),
            null == E && (E = 0.05),
            null == D && (D = 123456789),
            !(B in { lookup: !0, complete: !0 }))
          )
            return (
              console.log(
                "Permutation method needs to be one of {'lookup', 'complete'}."
              ),
              null
            );
          const w = I.length;
          for (let A = 0; A < w; A += 1)
            if ((0 !== I[A] && 1 !== I[A]) || (0 !== g[A] && 1 !== g[A]))
              return console.log("The input data is not binary."), null;
          for (let A = 0; A < w; A += 1)
            if (1 === I[A] && 1 === g[A])
              return (
                console.log(
                  "The bivariate local join count only applies on two variables with no-colocation."
                ),
                null
              );
          const N = this.toVecVecDouble([I, g]),
            R = this.wasm.local_multijoincount(
              i,
              o,
              N.values,
              N.undefs,
              E,
              Q,
              B,
              D
            );
          return null !== R ? new C(R, this) : null;
        }
        localMultiJoinCount(A, I, g, Q, B, E) {
          const D = A.getMapUid(),
            i = A.getUid();
          if (
            (null == g && (g = 999),
            null == Q && (Q = "lookup"),
            null == B && (B = 0.05),
            null == E && (E = 123456789),
            !(Q in { lookup: !0, complete: !0 }))
          )
            return (
              console.log(
                "Permutation method needs to be one of {'lookup', 'complete'}."
              ),
              null
            );
          const o = I.length;
          if (o)
            return (
              console.log("The input data is not from multivariate variables."),
              null
            );
          const w = I[0].length;
          for (let A = 0; A < o; A += 1)
            for (let g = 0; g < w; g += 1)
              if (0 !== I[A][g] && 1 !== I[A][g])
                return console.log("The input data is not binary."), null;
          if (2 === o)
            for (let A = 0; A < w; A += 1)
              if (1 === I[0][A] && 1 === I[1][A])
                return (
                  console.log(
                    "The input two variables have no colocations. Please use: localBiJoinCount()."
                  ),
                  null
                );
          const N = this.toVecVecDouble(I),
            R = this.wasm.local_multijoincount(
              D,
              i,
              N.values,
              N.undefs,
              B,
              g,
              Q,
              E
            );
          return null !== R ? new C(R, this) : null;
        }
        multiQuantileLisa(A, I, g, Q, B, E, D, i) {
          const o = A.getMapUid(),
            w = A.getUid();
          if (
            (null == B && (B = 999),
            null == E && (E = "lookup"),
            null == D && (D = 0.05),
            null == i && (i = 123456789),
            !(E in { lookup: !0, complete: !0 }))
          )
            return (
              console.log(
                "Permutation method needs to be one of {'lookup', 'complete'}."
              ),
              null
            );
          const N = Q.length;
          if (N !== I.length || N !== g.length)
            return (
              console.log(
                "The data size of ks, quantiles and values are not the same."
              ),
              null
            );
          const R = this.toVecInt(I),
            F = this.toVecInt(g),
            G = this.toVecVecDouble(Q),
            y = this.wasm.multi_quantile_lisa(
              o,
              w,
              R,
              F,
              G.values,
              G.undefs,
              D,
              B,
              E,
              i
            );
          return null !== y ? new C(y, this) : null;
        }
        static redcapMethods() {
          return {
            "firstorder-singlelinkage": !0,
            "fullorder-completelinkage": !0,
            "fullorder-averagelinkage": !0,
            "fullorder-singlelinkage": !0,
            "fullorder-wardlinkage": !0,
          };
        }
        skater(A, I, g, C, Q, B, E) {
          return this.redcap(A, I, g, "firstorder-singlelinkage", C, Q, B, E);
        }
        static checkScaleMethod(A) {
          return (
            A in B.scaleMethods() ||
            (console.log("The scaling method is not valid."), !1)
          );
        }
        static checkDistanceMethod(A) {
          return (
            A in B.distanceMethods() ||
            (console.log("The distance method is not valid."), !1)
          );
        }
        static getClusteringResult(A) {
          return A.is_valid()
            ? {
                clusters: B.parseVecInt(A.clusters()),
                total_ss: A.total_ss(),
                between_ss: A.between_ss(),
                within_ss: B.parseVecDouble(A.within_ss()),
                ratio: A.ratio(),
              }
            : null;
        }
        redcap(A, I, g, C, Q, E, D, i) {
          if (!(C in B.redcapMethods()))
            return console.log("Redcap method is not valid"), null;
          if (
            (null == D && (D = "standardize"),
            null == i && (i = "euclidean"),
            !B.checkScaleMethod(D))
          )
            return null;
          if (!B.checkDistanceMethod(i)) return null;
          const o = A.getMapUid(),
            w = A.getUid(),
            N = this.toVecVecDouble(g);
          null == Q && (Q = 0), null == E && (E = []);
          const R = this.wasm.redcap(
            o,
            w,
            I,
            C,
            N.values,
            this.toVecDouble(E),
            Q,
            D,
            i
          );
          return B.getClusteringResult(R);
        }
        static schcMethods() {
          return { single: !0, complete: !0, average: !0, ward: !0 };
        }
        schc(A, I, g, C, Q, E, D, i) {
          if (!(C in B.schcMethods()))
            return console.log("schc method is not valid"), null;
          if (
            (null == D && (D = "standardize"),
            null == i && (i = "euclidean"),
            !B.checkScaleMethod(D))
          )
            return null;
          if (!B.checkDistanceMethod(i)) return null;
          const o = A.getMapUid(),
            w = A.getUid(),
            N = this.toVecVecDouble(g);
          null == Q && (Q = 0), null == E && (E = []);
          const R = this.wasm.schc(
            o,
            w,
            I,
            C,
            N.values,
            this.toVecDouble(E),
            Q,
            D,
            i
          );
          return B.getClusteringResult(R);
        }
        azpGreedy(A, I, g, C, Q, E, D, i, o, w, N, R) {
          if (
            (null == C && (C = 0),
            null == Q && (Q = []),
            null == w && (w = "standardize"),
            null == N && (N = "euclidean"),
            !B.checkScaleMethod(w))
          )
            return null;
          if (!B.checkDistanceMethod(N)) return null;
          const F = A.getMapUid(),
            G = A.getUid(),
            y = this.toVecVecDouble(g);
          null == E && (E = []),
            null == D && (D = []),
            null == i && (i = []),
            null == o && (o = []);
          const s = this.toVecVecDouble(E).values,
            h = this.toVecDouble(D),
            K = this.toVecVecDouble(i).values,
            M = this.toVecDouble(o);
          null == R && (R = 123456789);
          const S = this.wasm.azp_greedy(
            F,
            G,
            I,
            y.values,
            C,
            this.toVecInt(Q),
            w,
            N,
            s,
            h,
            K,
            M,
            R
          );
          return B.getClusteringResult(S);
        }
        azpSA(A, I, g, C, Q, E, D, i, o, w, N, R, F, G) {
          if (
            (null == C && (C = 0.85),
            null == Q && (Q = 1),
            null == E && (E = 0),
            null == D && (D = []),
            null == R && (R = "standardize"),
            null == F && (F = "euclidean"),
            !B.checkScaleMethod(R))
          )
            return null;
          if (!B.checkDistanceMethod(F)) return null;
          const y = A.getMapUid(),
            s = A.getUid(),
            h = this.toVecVecDouble(g);
          null == i && (i = []),
            null == o && (o = []),
            null == w && (w = []),
            null == N && (N = []);
          const K = this.toVecVecDouble(i).values,
            M = this.toVecDouble(o),
            S = this.toVecVecDouble(w).values,
            k = this.toVecDouble(N);
          null == G && (G = 123456789);
          const a = this.wasm.azp_sa(
            y,
            s,
            I,
            C,
            Q,
            h.values,
            E,
            this.toVecInt(D),
            R,
            F,
            K,
            M,
            S,
            k,
            G
          );
          return B.getClusteringResult(a);
        }
        azpTabu(A, I, g, C, Q, E, D, i, o, w, N, R, F, G) {
          if (
            (null == C && (C = 10),
            null == Q && (Q = 10),
            null == E && (E = 0),
            null == D && (D = []),
            null == R && (R = "standardize"),
            null == F && (F = "euclidean"),
            !B.checkScaleMethod(R))
          )
            return null;
          if (!B.checkDistanceMethod(F)) return null;
          const y = A.getMapUid(),
            s = A.getUid(),
            h = this.toVecVecDouble(g);
          null == i && (i = []),
            null == o && (o = []),
            null == w && (w = []),
            null == N && (N = []);
          const K = this.toVecVecDouble(i).values,
            M = this.toVecDouble(o),
            S = this.toVecVecDouble(w).values,
            k = this.toVecDouble(N);
          null == G && (G = 123456789);
          const a = this.wasm.azp_tabu(
            y,
            s,
            I,
            C,
            Q,
            h.values,
            E,
            this.toVecInt(D),
            R,
            F,
            K,
            M,
            S,
            k,
            G
          );
          return B.getClusteringResult(a);
        }
        maxpGreedy(A, I, g, C, Q, E, D, i, o, w) {
          if (
            (null == g && (g = 1),
            null == i && (i = "standardize"),
            null == o && (o = "euclidean"),
            !B.checkScaleMethod(i))
          )
            return null;
          if (!B.checkDistanceMethod(o)) return null;
          const N = A.getMapUid(),
            R = A.getUid(),
            F = this.toVecVecDouble(I);
          (null != C && null != Q) ||
            console.log("maxp needs minBounds and minBoundValues arguments."),
            null == E && (E = []),
            null == D && (D = []);
          const G = this.toVecVecDouble(C).values,
            y = this.toVecDouble(Q),
            s = this.toVecVecDouble(E).values,
            h = this.toVecDouble(D);
          null == w && (w = 123456789);
          const K = this.wasm.maxp_greedy(
            N,
            R,
            F.values,
            g,
            i,
            o,
            G,
            y,
            s,
            h,
            w
          );
          return B.getClusteringResult(K);
        }
        maxpSA(A, I, g, C, Q, E, D, i, o, w, N, R) {
          if (
            (null == g && (g = 0.85),
            null == C && (C = 1),
            null == Q && (Q = 1),
            null == w && (w = "standardize"),
            null == N && (N = "euclidean"),
            !B.checkScaleMethod(w))
          )
            return null;
          if (!B.checkDistanceMethod(N)) return null;
          const F = A.getMapUid(),
            G = A.getUid(),
            y = this.toVecVecDouble(I);
          (null != E && null != D) ||
            console.log("maxp needs minBounds and minBoundValues arguments."),
            null == i && (i = []),
            null == o && (o = []);
          const s = this.toVecVecDouble(E).values,
            h = this.toVecDouble(D),
            K = this.toVecVecDouble(i).values,
            M = this.toVecDouble(o);
          null == R && (R = 123456789);
          const S = this.wasm.maxp_sa(
            F,
            G,
            y.values,
            Q,
            g,
            C,
            w,
            N,
            s,
            h,
            K,
            M,
            R
          );
          return B.getClusteringResult(S);
        }
        maxpTabu(A, I, g, C, Q, E, D, i, o, w, N, R) {
          if (
            (null == g && (g = 10),
            null == C && (C = 10),
            null == Q && (Q = 1),
            null == w && (w = "standardize"),
            null == N && (N = "euclidean"),
            !B.checkScaleMethod(w))
          )
            return null;
          if (!B.checkDistanceMethod(N)) return null;
          const F = A.getMapUid(),
            G = A.getUid(),
            y = this.toVecVecDouble(I);
          null == E && (E = []),
            null == D && (D = []),
            null == i && (i = []),
            null == o && (o = []);
          const s = this.toVecVecDouble(E).values,
            h = this.toVecDouble(D),
            K = this.toVecVecDouble(i).values,
            M = this.toVecDouble(o);
          null == R && (R = 123456789);
          const S = this.wasm.maxp_tabu(
            F,
            G,
            y.values,
            Q,
            g,
            C,
            w,
            N,
            s,
            h,
            K,
            M,
            R
          );
          return B.getClusteringResult(S);
        }
      }
      exports.New = function () {
        return new Promise((A) => {
          I()().then((I) => {
            const g = new B(I);
            A(g);
          });
        });
      };
    })();
})();