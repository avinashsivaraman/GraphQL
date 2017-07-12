const videos = [
    {
        id: '1',
        title: 'Dark knight',
        duration: 180,
        watched: true,
    },
    {
        id: '2',
        title: 'Super man',
        duration: 180,
        watched: false,
    }
];

const getVideoById = id => new Promise(resolve => {
    const [video] = videos.filter(video => {
        return video.id === id
    });
    resolve(video);
});

const getAllVideos = () => new Promise(resolve => resolve(videos));

const createVideo = ({ title, duration, watched }) => {
    const video = {
        id: (new Buffer(title, 'utf8'.toString('base64'))),
        title,
        duration,
        watched
    };
    videos.push(video);
    return video;
}

exports.getVideoById = getVideoById;
exports.getAllVideos = getAllVideos;
exports.createVideo = createVideo;