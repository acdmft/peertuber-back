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
    _id: { type: GraphQLID },
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
      args: { category: { type: GraphQLString }},
      resolve(parent, args) {
        if (args['category'] === 'all') {
          // return Video.find().limit(12);
          return Video.aggregate([{ $sample: { size: 12 } }]);
        } else {
          return Video.aggregate([{ $match: { category: args.category } }, {$sample: { size: 12 } }])
        }
      },
    },
    instance: {
      type: InstanceType,
      args: { host: { type: GraphQLID } },
      resolve(parent, args) {
        return Instance.findOne({ host: args.host })
      }
    }, 
    videoCategory: {
      type: new GraphQLList(VideoType),
      args: { category: { type: GraphQLString }},
      resolve(parent, args) {
        return Video.aggregate([{ $match: { category: args.category } }, {$sample: { size: 12 } }])
      }
    }
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery
});
