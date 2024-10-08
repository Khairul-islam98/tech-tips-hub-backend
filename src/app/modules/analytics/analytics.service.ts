import { Types } from 'mongoose';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';
import { Payment } from '../payment/payment.model';

const dailyPostAnylaticsFromDB = async (userId: string) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();

    const posts = await Post.find({
      authorId: userId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (posts.length === 0) {
      return {
        totalUpvotes: 0,
        totalDownvotes: 0,
        totalReactions: 0,
        commentCount: 0,
        postCount: 0,
      };
    }

    const totalUpvotes = posts.reduce(
      (acc, post) => acc + (post.upvotes?.length || 0),
      0,
    );
    const totalDownvotes = posts.reduce(
      (acc, post) => acc + (post.downvotes?.length || 0),
      0,
    );
    const totalReactions = totalUpvotes + totalDownvotes;
    const commentCount = posts.reduce(
      (acc, post) => acc + (post.comments?.length || 0),
      0,
    );
    const postCount = posts.length;

    return {
      totalUpvotes,
      totalDownvotes,
      totalReactions,
      commentCount,
      postCount,
    };
  } catch (error) {
    console.error('Error fetching daily post analytics:', error);
    throw new Error('Unable to fetch daily post analytics.');
  }
};
const weeklyPostAnalyticsFromDB = async (userId: string) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setUTCHours(0, 0, 0, 0);

    // Set to last Sunday
    const dayOfWeek = startOfWeek.getUTCDay();
    const diffToSunday = dayOfWeek === 0 ? 0 : -dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diffToSunday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // Convert userId to ObjectId
    const userObjectId = new Types.ObjectId(userId);

    // Find posts in range
    const matchedPosts = await Post.find({
      authorId: userObjectId,
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    });

    console.log('Matched Posts:', matchedPosts);

    // Aggregation
    const weeklyAnalytics = await Post.aggregate([
      {
        $match: {
          authorId: userObjectId,
          createdAt: {
            $gte: startOfWeek,
            $lt: endOfWeek,
          },
        },
      },
      {
        $project: {
          dayOfWeek: { $dayOfWeek: '$createdAt' },
          upvotes: { $size: { $ifNull: ['$upvotes', []] } },
          downvotes: { $size: { $ifNull: ['$downvotes', []] } },
          comments: { $size: { $ifNull: ['$comments', []] } },
        },
      },
      {
        $group: {
          _id: '$dayOfWeek',
          totalUpvotes: { $sum: '$upvotes' },
          totalDownvotes: { $sum: '$downvotes' },
          totalComments: { $sum: '$comments' },
          totalPosts: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    console.log('Weekly Analytics After Grouping:', weeklyAnalytics);

    // Format results
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const formattedAnalytics = daysOfWeek.map((day, index) => {
      const data = weeklyAnalytics.find((item) => item._id === index + 1);
      return {
        day: day,
        totalPosts: data ? data.totalPosts : 0,
        totalReactions: data ? data.totalUpvotes + data.totalDownvotes : 0,
        totalComments: data ? data.totalComments : 0,
        totalUpvotes: data ? data.totalUpvotes : 0,
        totalDownvotes: data ? data.totalDownvotes : 0,
      };
    });

    return formattedAnalytics;
  } catch (error) {
    console.error('Error fetching weekly post analytics:', error);
    throw new Error('Unable to fetch weekly post analytics.');
  }
};

const monthlyPostAnalyticsFromDB = async (userId: string) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0);

    const testQuery = await Post.find({
      authorId: userId,
      createdAt: {
        $gte: startOfYear,
        $lt: endOfYear,
      },
    });

    console.log('Test Query Results:', testQuery);

    const monthlyAnalytics = await Post.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalUpvotes: { $sum: { $size: { $ifNull: ['$upvotes', []] } } },
          totalDownvotes: { $sum: { $size: { $ifNull: ['$downvotes', []] } } },
          totalReactions: {
            $sum: {
              $add: [
                { $size: { $ifNull: ['$upvotes', []] } },
                { $size: { $ifNull: ['$downvotes', []] } },
              ],
            },
          },
          commentCount: { $sum: { $size: { $ifNull: ['$comments', []] } } },
          postCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    console.log('Monthly Analytics Data: ', monthlyAnalytics);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const formattedAnalytics = months.map((month, index) => {
      const data = monthlyAnalytics.find((item) => item._id === index + 1);
      return {
        month: month,
        totalPosts: data ? data.postCount : 0,
        totalReactions: data ? data.totalReactions : 0,
        totalComments: data ? data.commentCount : 0,
        totalUpvotes: data ? data.totalUpvotes : 0,
        totalDownvotes: data ? data.totalDownvotes : 0,
      };
    });

    return formattedAnalytics;
  } catch (error) {
    console.error('Error fetching monthly post analytics:', error);
    throw new Error('Unable to fetch monthly post analytics.');
  }
};

const adminAnalyticsFromDB = async () => {
  const user = await User.estimatedDocumentCount();
  const post = await Post.estimatedDocumentCount();
  const payment = await Payment.find();
  const totalRevenue = payment.reduce((acc, curr) => acc + curr.amount, 0);

  return {
    user,
    post,
    totalRevenue,
  };
};

export const AnalyticsServices = {
  dailyPostAnylaticsFromDB,
  weeklyPostAnalyticsFromDB,
  monthlyPostAnalyticsFromDB,
  adminAnalyticsFromDB,
};
