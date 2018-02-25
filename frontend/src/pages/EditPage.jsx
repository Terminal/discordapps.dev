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

export default class EditPage extends Component {
  constructor(props) {
    super(props);
    fetch(`https://ls.terminal.ink/api/v1/bots/${props.match.params.id}`)
      .then(data => data.json())
      .then((data) => {
        this.state = data;
      });
  }
  render() {
    return (
      <div>
        <h4>Introduction</h4>
        <p>
          The violin (violin) is a kind of a super clean orchestra played to ring carry instruments.
          It is widely spread all over the world, is the modern orchestra string of the main instrument.
          In the music it plays very important position, is the pillar of the modern symphony orchestra, but also has the difficult playing skills solo instrument.
          The emergence of modern violin has been 300 years of history, is the western music since the 17th century in one of the most important instruments as the instrument queen, was also the production is itself a gate violin for fine art.
          The violin beautiful tone, close to a broad range, and the performance is strong, it was born from that day on, he&#39;s been in the instrument of significant position, for people loved.
          If the piano is &quot;the king of Musical Instruments, then the violin is&quot; the queen of instruments&quot;.
          For centuries, the world famous composer wrote a lot of violin classic works, violinist in this instrument into the soul, the development of the superb performance art.
          The violin can concerts and solo.
          The Violin is a string of four bowed instruments, the family is the main members of the family system of other members are: (the viola, the cello and the bass).
          Modern violin originated from Italian Craig mona, in 1600-1750 years to become the largest violin production center.
          The famous master making guitars are: Nicola Amati (nicolas, Marty), Antonio Stradivari (Antonio Stella bottom tile), and Giuseppe Guarneri (ji plug pu melon nai);
          They made instruments so far are priceless.
          The violins fifth tune: g, d1, a1, e2, register more than three and a half group, is all orchestra indispensable instrument, also after instruments.
        </p>
      </div>
    );
  }
}
