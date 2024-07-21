
import { storageService } from '../async-storage.service'
import { makeId, makeLorem } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'storyDB'

export const storyService = {
    query,
    getById,
    save,
    remove,
    toggleLike,
    addStoryComment
}

_demoStories()

//For debugging
window.cs = storyService

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)
    if (filterBy.by) {
        stories = stories.filter(story => filterBy.by._id === story.by._id)
    }
    return stories
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    if (story._id) {
        const storyToSave = {
            _id: story._id,
            txt: story.txt,
            comments: story.comments,
            likedBy: story.likedBy
        }
        return await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        const storyToSave = {
            txt: story.txt,
            imgUrl: story.imgUrl,
            by: story.by,
            comments: [],
            likedBy: []
        }
        return await storageService.post(STORAGE_KEY, storyToSave)
    }
}

async function toggleLike(storyId) {
    const story = await getById(storyId)
    const likingUser = userService.getLoggedinUser()
    const idx = story.likedBy.findIndex(user => user._id === likingUser._id)
    if (idx === -1) {
        story.likedBy.push(likingUser)
    } else {
        story.likedBy.splice(idx, 1)
    }
    await save(story)
    return story
}

async function addStoryComment(storyId, txt) {
    const story = await getById(storyId)
    const comment = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.comments.push(comment)
    await storageService.put(STORAGE_KEY, story)
    return story
}

async function _demoStories() {
    let stories = await query()
    if (!stories || !stories.length) {
        stories = [
            {
                txt: 'Enjoying a perfect latte at Sunshine Cafe ☀️☕ #coffeelover',
                imgUrl: 'https://images.unsplash.com/photo-1527596428171-7885b82c91c6',
                by: {
                    _id: makeId(),
                    fullname: 'Emma Chen',
                    imgUrl: 'https://images.unsplash.com/photo-1589525231707-f2de2428f59c'
                }
            }, {
                txt: 'Just finished a 5K run in Central Park! Personal best time of 22:30 🏃‍♀️🏅 #fitnessmotivation',
                imgUrl: 'https://images.unsplash.com/photo-1638684703956-802af5b75f99',
                by: {
                    _id: makeId(),
                    fullname: 'Marcus Johnson',
                    imgUrl: 'https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4'
                }
            }, {
                txt: 'New haircut, who dis? 💇‍♂️ Thanks @StyleMasterSalon for the fresh look!',
                imgUrl: 'https://images.unsplash.com/photo-1529434173292-b6709e2fe899',
                by: {
                    _id: makeId(),
                    fullname: 'Aiden Patel',
                    imgUrl: 'https://images.unsplash.com/photo-1562038969-e85c13ecb2ac'
                }
            }, {
                txt: 'Meal prep Sunday in full swing! Prepped 5 healthy lunches for the week ahead 🥗🍱 #mealprep',
                imgUrl: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d',
                by: {
                    _id: makeId(),
                    fullname: 'Olivia Rodriguez',
                    imgUrl: 'https://images.unsplash.com/photo-1665686310934-8fab52b3821b'
                }
            }, {
                txt: 'Beach day with the squad! 🏖️👙 @beachbabe22 @surfdude44 @sandyfeet99',
                imgUrl: 'https://images.unsplash.com/photo-1531514381259-8c9fedc910b8',
                by: {
                    _id: makeId(),
                    fullname: 'Zoe Thompson',
                    imgUrl: 'https://images.unsplash.com/photo-1664575603992-0f17b771dd91'
                }
            }, {
                txt: 'Just adopted this cutie from Paws Rescue! Meet Luna 🐱❤️ #adoptdontshop',
                imgUrl: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90',
                by: {
                    _id: makeId(),
                    fullname: 'Noah Williams',
                    imgUrl: 'https://images.unsplash.com/photo-1463860452799-793003efcb2d'
                }
            }, {
                txt: 'Throwback to last summers trip to Paris 🗼 Take me back! #wanderlust',
                imgUrl: 'https://images.unsplash.com/photo-1471623320832-752e8bbf8413',
                by: {
                    _id: makeId(),
                    fullname: 'Sofia Nguyen',
                    imgUrl: 'https://images.unsplash.com/photo-1505201372024-aedc618d47c3'
                }
            }, {
                txt: 'New plant baby alert! 🌿 This monstera is going to look amazing in my living room #plantparent',
                imgUrl: 'https://images.unsplash.com/photo-1604866830513-d54766457f45',
                by: {
                    _id: makeId(),
                    fullname: 'Liam OConnor',
                    imgUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19'
                }
            }, {
                txt: 'First day at my new job! Excited for this new chapter 💼 #careergoals',
                imgUrl: 'https://images.unsplash.com/photo-1565383690591-1ee1b6582cef',
                by: {
                    _id: makeId(),
                    fullname: 'Avi Sinclair',
                    imgUrl: 'https://images.unsplash.com/photo-1583341612074-ccea5cd64f6a'
                }
            }, {
                txt: 'Homemade pizza night with a view 🍕🌃 Sometimes staying in is the best night out!',
                imgUrl: 'https://images.unsplash.com/photo-1589187151053-5ec8818e661b',
                by: {
                    _id: makeId(),
                    fullname: 'Ethan Kowalski',
                    imgUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6'
                }
            }
        ]
        for (let story of stories) {
            await save(story)
        }
    }
}