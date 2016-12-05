/**
 * Created by g2070501 on 29-11-2016.
 */
var Product = require('../models/product')

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath: "https://s-media-cache-ak0.pinimg.com/736x/eb/b6/db/ebb6db354867c06dbac99751d5ee98a6.jpg",
        title: "Pining Game",
        description: "O MELHOR jogo do Ano",
        price: 10
    }),
    new Product({
        imagePath: "https://www.wired.com/images_blogs/photos/uncategorized/2007/11/21/ut3_collectors_080107.jpg",
        title: "Unreal",
        description: "Aproveita já esta Oferta",
        price: 10
    }),
    new Product({
        imagePath:"http://cdn3-www.playstationlifestyle.net/assets/uploads/gallery/eyn2k-mafia-iii/032510-mafia2.jpg",
        title: "Mafia 3",
        description: "Com este nova versao aproveita tudo ao máximo!",
        price: 10
    })
];

var done=0;
for (var i=0; i< products.length; i++)
{
    products[i].save(function (err, result) {
        done++;
        if(done==products.length)
        {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}



