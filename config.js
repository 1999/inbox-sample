'use strict';

const tasks = [];
const activeMode = {};

const menu = {
    show: true,
    groups: [
        {
            id: 'gtd',
            title: null,
            items: [
                {
                    id: 'inbox',
                    active: true,
                    icon: {
                        '1x': 'https://www.gstatic.com/images/icons/material/system/1x/inbox_googblue_24dp.png',
                        '2x': 'https://www.gstatic.com/images/icons/material/system/2x/inbox_googblue_24dp.png'
                    },
                    color: '3399ff',
                    title: 'Inbox'
                },
                {
                    id: 'done',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_done_clr_24dp_r4.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_done_clr_24dp_r4_2x.png'
                    },
                    color: '009966',
                    title: 'Done'
                }
            ]
        },
        {
            id: 'gmail',
            title: null,
            items: [
                {
                    id: 'sent',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_sent_right_g60_24dp_r1.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_sent_right_g60_24dp_r1_2x.png'
                    },
                    color: '999999',
                    title: 'Sent'
                },
                {
                    id: 'trash',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_trash_g60_24dp_r2.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_trash_g60_24dp_r2_2x.png'
                    },
                    color: '999999',
                    title: 'Trash'
                },
                {
                    id: 'spam',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_spam_g60_24dp_r2.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_spam_g60_24dp_r2_2x.png'
                    },
                    color: '999999',
                    title: 'Spam'
                }
            ]
        },
        {
            id: 'bundled',
            title: 'Bundled in the inbox',
            items: [
                {
                    id: 'purchases',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_purchases_24px_clr_r3.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_purchases_24px_clr_r3_2x.png'
                    },
                    color: '666633',
                    title: 'Purchases'
                }
            ]
        },
        {
            id: 'unbundled',
            title: 'Unbundled',
            items: [
                {
                    id: 'ruka2013',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_custom-cluster_24px_g60_r3.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_custom-cluster_24px_g60_r3_2x.png'
                    },
                    color: '999999',
                    title: 'ruka2013'
                },
                {
                    id: 'tickets-bmth',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_custom-cluster_24px_g60_r3.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_custom-cluster_24px_g60_r3_2x.png'
                    },
                    color: '999999',
                    title: 'tickets/bmth'
                },
                {
                    id: 'tickets-enter-shikari',
                    active: false,
                    icon: {
                        '1x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_custom-cluster_24px_g60_r3.png',
                        '2x': 'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_custom-cluster_24px_g60_r3_2x.png'
                    },
                    color: '999999',
                    title: 'tickets/enter shikari'
                }
            ]
        }
    ]
}

export default {
    menu,
    tasks,
    activeMode
};
