const express = require('express')
const Cheerio = require('cheerio');
const got = require('got')
const userHelper = require('../model/userHelper');
module.exports = {
    //home page render
    home: (req, res) => {
        res.render('user/home',{url:req.session.urlError})
        req.session.urlError = false;
    },

    //link submission
    submitLink: async (req, res) => {

        try {

            const response = await got(req.body.link);

            const html = response.body;

            const $ = Cheerio.load(html);

            const linkObjects = $('h1,h2,h3,h4,h5,h6,p,li,th,td');

            // Collect the "href" and "title" of each link and add them to an array
            const allWords = [];
            linkObjects.each((index, element) => {
                allWords.push($(element).text(), // get the text
                );
            });

            let count = 0;

            allWords.map((str) => {
                str = str.replace(/(^\s*)|(\s*$)/gi, "");
                str = str.replace(/[ ]{2,}/gi, " ");
                str = str.replace(/\n /, "\n");
                count += str.split(' ').length;
            })

            userHelper.submitUrl(count, req.body.link).then((response) => {
                res.redirect('/history')
            })
        } catch (error) {
            console.log('erorr', error);
            req.session.urlError = true
            res.redirect('/')
        }
    },

    //render history page 
    linksHistory: (req, res) => {
        userHelper.getHistory().then((response) => {
            res.render('user/history', {response})
        }).catch(()=>{

        })
    },

    //change favrorites status
    favoriteStatus: (req, res) => {
        if (req.body.favoriteStatus === 'true') {
            userHelper.removeFavorites(req.body.domainId).then((response) => {
                res.json({response})
            }).catch((error)=>{
                res.json(error);
            })
        } else if(req.body.favoriteStatus === 'false'){
            userHelper.addFavorites(req.body.domainId).then((response) => {
                res.json({response});
            }).catch((error)=>{
                res.json(error);
            })
        }
    }
}
