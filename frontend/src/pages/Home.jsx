/**
    ls.terminal.ink Discord Bot List Server
    Copyright (C) 2018 Moustacheminer Server Services
    Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import BotCard from './../components/BotCard/BotCard.jsx';

export default class BotList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0,
      length: 6,
    }
  }
  componentDidMount() {
    this.load();
  }
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.length);

    this.setState({offset: offset}, () => {
      this.load();
    });
  };
  load() {
    fetch('https://ls.terminal.ink/api/v1/bots')
      .then(data => data.json())
      .then(data => {
        this.setState({
          data: data.splice(this.state.offset, this.state.length),
          pageCount: Math.ceil(bots.length / this.state.length)
        })
      })
  }
  render() {
    const elements = this.state.data.map((bot) => (
      <BotCard bot={bot} key={bot.id} />
    ));

    return (
      <div className="bots">
        <div>
          {elements}
        </div>
        <ReactPaginate previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    );
  }
}

