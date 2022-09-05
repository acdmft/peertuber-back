const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");
// MODELS
const Video = require("../models/Video");
const Instance = require("../models/Instance");
const User = require("../models/User");
const Like = require("../models/Like");

// TYPES
const VideoType = new GraphQLObjectType({
  name: "Video",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    duration: { type: GraphQLInt },
    thumbnailImg: { type: GraphQLString },
    instance: { type: InstanceType,
                resolve(parent, args) {
                  return Instance.findOne({host: parent.instance})
                }  
              },
    likes: { type: GraphQLInt,
              resolve(parent, args) {
                return Like.count({videoId: parent.id});
              }
    }    
  }),
});

const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: () => ({
    videoId: { type: GraphQLID },
    userId: { type: GraphQLID },
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  })
});

const InstanceType = new GraphQLObjectType({
  name: "Instance",
  fields: () => ({
    host: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    title: { type: GraphQLString },
  }),
});

// QUERIES
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    videos: {
      type: new GraphQLList(VideoType),
      resolve(parent, args) {
        // return Video.find().limit(12);
        return Video.aggregate([{ $sample: { size: 12 } }]);
      },
    },
    instance: {
      type: InstanceType,
      args: { host: { type: GraphQLID } },
      resolve(parent, args) {
        return Instance.findOne({ host: args.host })
      }
    }
  },
});

// MUTATIONS 
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLike: {
      type: LikeType,
      args: {
        videoId: { type: GraphQLID },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const like = new Like({ videoId: args.videoId, userId: args.userId });
        return like.save();
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
