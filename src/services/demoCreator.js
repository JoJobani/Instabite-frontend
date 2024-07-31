import { loadUsers } from "../store/actions/user.actions.js"
import { addStory } from "../store/actions/story.actions.js"
import { storyService } from "./story"
import { getRandomInt, getRandom, makeId, randomPastTime } from "./util.service.js"

export async function demoCreator() {
    const users = await loadUsers()
    const total = pics.length
    for (let i = 0; i < total; i++) {
        console.log(`creating story ${i} out of ${total}`)
        let newStory = storyService.getEmptyStory()

        //generate random text for post
        newStory.txt = generateGeneralFoodPost()

        //get random picture
        let randPicIdx = getRandomInt(0, pics.length)
        newStory.imgUrl = pics[randPicIdx]
        pics.splice(randPicIdx, 1)

        //generate uploader
        let user = users[Math.floor(Math.random() * users.length)]
        let miniUser = {
            _id: user._id,
            username: user.username,
            imgUrl: user.imgUrl
        }
        newStory.by = miniUser

        //give the story some fake likes
        let likesNum = getRandomInt(10, 100)
        for (let j = 0; j < likesNum; j++) {
            let likeId = makeId()
            newStory.likedBy.push(likeId)
        }

        //make some users save the story
        let usersCopy = structuredClone(users)
        let uploaderIdx = usersCopy.findIndex(userId => userId === miniUser._id)
        usersCopy.splice(uploaderIdx, 1)
        for (let j = 0; j < 4; j++) {
            let randUserIdx = getRandomInt(0, usersCopy.length)
            newStory.savedBy.push(usersCopy[randUserIdx]._id)
            usersCopy.splice(randUserIdx, 1)
        }

        //make some users tagged
        usersCopy = structuredClone(users)
        usersCopy.splice(uploaderIdx, 1)
        let randUserIdx = getRandomInt(0, usersCopy.length)
        let randUser = usersCopy[randUserIdx]
        newStory.taggedUsers.push(randUser._id)

        //make comments
        usersCopy = structuredClone(users)
        usersCopy.splice(uploaderIdx, 1)
        for (let j = 0; j < 6; j++) {
            let randUserIdx = getRandomInt(0, usersCopy.length)
            let randUser = usersCopy[randUserIdx]
            let miniCommentor = {
                _id: randUser._id,
                username: randUser.username,
                imgUrl: randUser.imgUrl
            }
            let comment = {
                id: makeId(),
                by: miniCommentor,
                txt: generateRandomComment()
            }
            newStory.comments.push(comment)
            usersCopy.splice(randUserIdx, 1)
        }

        //generate random date
        let timestamps = generateTimeStamps(total)
        newStory.createdAt = timestamps[i]

        await addStory(newStory)
    }
}

function generateTimeStamps(num) {
    let timestamps = []
    for (let i = 0; i < num; i++) {
        let timestamp = randomPastTime()
        timestamps.push(timestamp)
    }
    timestamps.sort()
    return timestamps
}

function generateGeneralFoodPost() {
    const adjectives = ["delicious", "tasty", "mouth-watering", "savory", "spicy", "fresh", "crunchy", "juicy"];
    const verbs = ["enjoying", "devouring", "craving", "loving", "savoring"];
    const generalWords = ["meal", "dish", "bite", "treat", "feast"];
    const possibleStarters = ["", "Currently "];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomGeneralWord = generalWords[Math.floor(Math.random() * generalWords.length)];
    const randomStarter = possibleStarters[Math.floor(Math.random() * possibleStarters.length)];

    return `${randomStarter}${randomVerb} this ${randomAdjective} ${randomGeneralWord}!`;
}

function generateRandomComment() {
    const adjectives = ["delicious", "amazing", "mouthwatering", "scrumptious", "tasty", "yummy", "heavenly", "savory"];
    const emojis = ["😍", "😋", "🤤", "🔥", "👌", "❤️", "🍴", "🍽️"];
    const phrases = [
        "This looks so good!",
        "I need this in my life.",
        "When can I have some?",
        "This is making me so hungry.",
        "Looks like a piece of art!",
        "I could eat this every day.",
        "Whats the recipe?",
        "Is there any left for me?",
        "Absolutely love this!",
        "Perfection on a plate."
    ]

    const commentStructures = [
        () => `${getRandom(adjectives)}! ${getRandom(emojis)}`,
        () => `${getRandom(phrases)} ${getRandom(emojis)}`,
        () => `${getRandom(emojis)} ${getRandom(adjectives)}.`,
        () => `${getRandom(phrases)}`
    ]

    return commentStructures[Math.floor(Math.random() * commentStructures.length)]();
}

var pics = [
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421169/foodPics/rekpwevsdqscvoedjhbd.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421169/foodPics/hafkibm5bpqg3rvewn9k.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421169/foodPics/mvqfpeljcd4u7xx0dkcj.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421168/foodPics/cbnildizb0nkfpdywh1j.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421168/foodPics/d9r9xfx3olt6p4pcawzw.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421168/foodPics/gg1qivpeh355x4b7hios.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421168/foodPics/bbtnool9pl4zfiwffnp9.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421168/foodPics/aia0pxzsiesgxuwq9jj7.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421168/foodPics/ibbshhjrl7ifrdnoxjhm.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421167/foodPics/zaxxp1yj3kp0vasyc83o.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421167/foodPics/nmlukraercertdovg2a8.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421167/foodPics/smshdymrrpd2ipvxuijk.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421167/foodPics/lg8lazcm0pkucpopb5yq.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421167/foodPics/up2ibdqwbv1ofuyezls1.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421167/foodPics/hbbvuifqmx3nmpdg97oa.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421166/foodPics/hgtkr1fi9fhcd1ggr3oc.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421166/foodPics/mf3gnm6vxcnbudswm1yr.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421166/foodPics/cgkmmlkj20ffjzr8bxrz.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421166/foodPics/g4msvzvk5xvznshornms.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421166/foodPics/ly9uwhsqx72xspax3gct.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421165/foodPics/hzuxnqppt2hfqpti3nb3.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421165/foodPics/gx1qlnplmdfvldwrp485.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421165/foodPics/oox7qxsxzpgo9swjiele.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421165/foodPics/zwfr5bxpmgky79jevtye.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421165/foodPics/gqryjvasif3p471ql2wg.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421164/foodPics/gwvvrvz1xskolfqj2ege.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421164/foodPics/skapjmg9o3idmkkm2wxp.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421164/foodPics/y3v3jb94th6qy3xymz0s.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421164/foodPics/hp3sinqkhjy1ubt02ras.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421164/foodPics/uflsek4su7wiabdjg4fb.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421164/foodPics/sd3lwuqeopieoskfrqtq.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421163/foodPics/sgf1sytlbqjvw7xlpvgs.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421163/foodPics/z1i49mao5pnekdh7n292.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421163/foodPics/fl5mnaqbk9ehvghib3ja.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421163/foodPics/lf4qp4ounqv9lcj4i7as.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421163/foodPics/lmlirhryx1y8fdpbxn6n.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421163/foodPics/wrdr8cjnrfzr5tw5xr89.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421162/foodPics/n9ngvxbhzykx6wrcfb0j.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421162/foodPics/jczuh5g01u0qhxqd7ido.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421162/foodPics/zgvjyetgqhjf8dhmot5k.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421162/foodPics/f3ytrb8bv24pyd6bgnwf.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421162/foodPics/nsj0wokgez32louaxix9.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/m5sfyco6y9cfs1zqracm.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/ixaqa3irau3nbottbone.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/uqglp60hu8ly8yqhew69.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/gux4ql6envbjqdjtngxi.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/zeuzmydyif3gqbsekjwu.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421161/foodPics/leizynqlraftxdsvmem0.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/sapyplkn01wqb32fd4i6.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/vd8r3p9qr3ts54pixz3t.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/z6msdpaeih6g4ux9cayw.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/cvcenrctckm0ovham4hk.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/ffxvjn015cfstvkm4wdb.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/wbnzxoz0tkp6yxdpar6o.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/ia5ij1yhb7rjfcsmgcn4.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421160/foodPics/nekuf12tw9vy8hkkelnw.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421159/foodPics/o4tqk0zmy8ms2rpsvimk.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421159/foodPics/js7ruttmb7cytjcykod3.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421159/foodPics/lqteuhwqdacodvdbctxz.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421159/foodPics/qrujnflmxxlhk3tvqxyu.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421158/foodPics/zay0tclnlsqirqnqdmyx.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421158/foodPics/lfox6rzqrczalpnuo6ym.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421158/foodPics/oor7psodgh6p77qh2zqe.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421158/foodPics/ifvfwtjvcgo9n1fxoz7i.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421158/foodPics/kp5jmvtgolrw5jzsrtnf.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/rj8moqnmgcszvuh1o3nj.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/mjcfsx0aayhdsibzrgvi.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/vthqc4b6gmha1cwi0ity.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/hrsdzb6xavwjujoahdt5.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/thhpy6rcfyqzqvqycton.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/sypifhaofhlwoool35ld.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/dju2mhfzmpvcnktyptl0.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/ruoos75wgfpnqmvlwoue.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421157/foodPics/gxk44hi4utryhdyzv7id.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421156/foodPics/ujuewwaqnpdsc6wfui3w.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421156/foodPics/kfu9msi0fljqvqx0yxja.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421156/foodPics/whzr7artcypknlpuryky.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421156/foodPics/mfea078ixy82ozydxezh.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421156/foodPics/dcplbgmtd1sb4skhnsra.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421155/foodPics/imb3ixabtrwkqcj5v3z5.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421155/foodPics/pujt79de32elpvshfbnu.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421148/foodPics/eeuawyhdopchlouq5inz.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421147/foodPics/cketryjo4faycdkdn7pi.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421147/foodPics/powir9jby3tiqvw5pk62.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421147/foodPics/rvxgltr5gd6jdrrbvy8x.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421143/foodPics/hrggxuskpxppj1c5z5b0.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421142/foodPics/g1biifmt6izodtnmhnxy.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421139/foodPics/uuazpuu45adiu4qnozd6.jpg',
    'https://res.cloudinary.com/djprda7rj/image/upload/v1722421135/foodPics/xhflzjaq2vlxgib2f9cl.jpg'
]