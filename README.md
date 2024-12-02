### All routing Patterns

- /_ All routing patterns _/

- /_ this means you can write as many "b" as you want but it should start from "a" end with "c" _/
-      app.get("/ab+c", (req, res) => {
         res.send({ firstName: "Jagadeesh", lastName: "vemul" });
       });

- /_ this means you can write as many "bd" as you want but it should start from "a" end with "c" _/
-      app.get("/a(bd)+c", (req, res) => {
         res.send({ firstName: "Jagadeesh", lastName: "vemul" });
       });

- /_ here "b" is optional either you can write or you can ignore _/
-     app.get("/ab?c", (req, res) => {
       res.send({ firstName: "Jagadeesh", lastName: "vemul" });
      });

- /_ here bd is optional you can group like this also _/
-     app.get("/a(bd)?c", (req, res) => {
       res.send({ firstName: "Jagadeesh", lastName: "vemul" });
      });

- /_ its like it will start from "ab" and end with "c" and you can write anything in between it will work _/
-     app.get("/ab\*c", (req, res) => {
       res.send({ firstName: "Jagadeesh", lastName: "vemula" });
      });

- /_ this will give query parameter value _/
-     app.get("/user", (req, res) => {
       console.log(req.query);
       res.send({ firstName: "Jagadeesh", lastName: "vemul" });
      });

- /_ this will give dynamic path value _/
-     app.get("/user/:userId", (req, res) => {
        console.log(req.params);
        res.send({ firstName: "Jagadeesh", lastName: "vemul" });
      });

- /_ for multiple dynamic paths _/
-      app.get("/user/:userId/:userName/:age", (req, res) => {
        console.log(req.params);
        res.send({ firstName: "Jagadeesh", lastName: "vemul" });
       });

- /_ regex pattern _/

- /_ in your path a is there means it will work _/
-      app.get(/a/, (req, res) => {
        res.send({ firstName: "Jagadeesh", lastName: "vemul" });
        });

- /_ you can write anything before but end with fly only _/
-      app.get(/.\*fly$/, (req, res) => {
        res.send({ firstName: "Jagadeesh", lastName: "vemul" });
       });
