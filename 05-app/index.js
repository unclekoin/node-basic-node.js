const request = require('request');
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const getTeams = (dom, amount) => {
  const teams = [];
  for (let i = 0; i < amount; i++) {
    const row = dom.window.document.querySelector(
      `tbody .standing-table__row:nth-child(${i + 1})`
    );

    const teamName = row.querySelector(
      '.standing-table__cell:nth-child(2) a'
    ).innerHTML;
    const games = row.querySelector(
      '.standing-table__cell:nth-child(3)'
    ).innerHTML;
    const pts = row.querySelector(
      '.standing-table__cell:nth-child(10)'
    ).innerHTML;

    teams.push({ teamName, games, pts });
  }

  return teams;
};

const requestLeague = (leagueId) => {
  request(`https://www.skysports.com/${leagueId}-table`, (err, res, body) => {
    if (err) {
      console.log('ERROR:', err);
      return;
    }
    const dom = new JSDOM(body);
    const teams = getTeams(dom, 5);
    console.log(leagueId, teams);
  });
};

const leagues = ['premier-league', 'la-liga', 'serie-a', 'bundesliga', 'ligue-1'];

leagues.forEach((league) => {
  requestLeague(league);
});
