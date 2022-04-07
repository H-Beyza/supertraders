const db = require("./app/models");
const Share = db.shares;
const Portfolio = db.portfolios;

const makeid = () => {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var isUnique = true;
    for (var i = 0; i < 3; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    Share.findByPk(id).then(data => {
        if (data) {
            isUnique = false;
        }
    })
    if (isUnique) {
        return id;
    }
    return makeid();
}

Share.bulkCreate([
    { id: "AAA", rate: "1000.90", total_shares: "1000", shares_bought: "130", shares_sold: "40" },
    { id: makeid(), rate: "24.45", total_shares: "100", shares_bought: "130", shares_sold: "40" },
    { id: makeid(), rate: "55.50", total_shares: "100", shares_bought: "160", shares_sold: "60" },
    { id: makeid(), rate: "150.35", total_shares: "100", shares_bought: "120", shares_sold: "30" },
    { id: makeid(), rate: "1500.50", total_shares: "100", shares_bought: "80", shares_sold: "40" },
    { id: makeid(), rate: "345.45", total_shares: "100", shares_bought: "100", shares_sold: "50" },
])

Portfolio.bulkCreate([
    { name: "Ayşe", surname: "Güler" },
    { name: "Ali", surname: "Kaçar" },
    { name: "Elif", surname: "Korkmaz" },
    { name: "Hasan", surname: "Yün" },
    { name: "Fatma", surname: "Gül" },
])