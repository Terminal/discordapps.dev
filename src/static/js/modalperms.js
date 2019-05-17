/**
 * Modal Permissions
 * MIT License
 *
 * Copyright (C) 2015 - 2018 Moustacheminer Server Services
 * Copyright (C) 2017 - 2018 ls.terminal.ink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function modalperms() { // eslint-disable-line
  const perms = {
    CREATE_INSTANT_INVITE: 0x00000001,
    KICK_MEMBERS: 0x00000002,
    BAN_MEMBERS: 0x00000004,
    ADMINISTRATOR: 0x00000008,
    MANAGE_CHANNELS: 0x00000010,
    MANAGE_GUILD: 0x00000020,
    ADD_REACTIONS: 0x00000040,
    VIEW_AUDIT_LOG: 0x00000080,
    READ_MESSAGES: 0x00000400,
    SEND_MESSAGES: 0x00000800,
    SEND_TTS_MESSAGES: 0x00001000,
    MANAGE_MESSAGES: 0x00002000,
    EMBED_LINKS: 0x00004000,
    ATTACH_FILES: 0x00008000,
    READ_MESSAGE_HISTORY: 0x00010000,
    MENTION_EVERYONE: 0x00020000,
    USE_EXTERNAL_EMOJIS: 0x00040000,
    CONNECT: 0x00100000,
    SPEAK: 0x00200000,
    MUTE_MEMBERS: 0x00400000,
    DEAFEN_MEMBERS: 0x00800000,
    MOVE_MEMBERS: 0x01000000,
    USE_VAD: 0x02000000,
    CHANGE_NICKNAME: 0x04000000,
    MANAGE_NICKNAMES: 0x08000000,
    MANAGE_ROLES: 0x10000000,
    MANAGE_WEBHOOKS: 0x20000000,
    MANAGE_EMOJIS: 0x40000000,
  };
  const invite = document.getElementById('invite');
  const id = document.getElementById('id');
  let permissions = 0;
  Object.keys(perms).forEach((permission) => {
    if (document.getElementById(permission).checked) {
      permissions += perms[permission];
    }
  });

  invite.value = `https://discordapp.com/oauth2/authorize?client_id=${id.value}&scope=bot&permissions=${permissions}`;
}
