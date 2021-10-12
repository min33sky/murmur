import React from 'react';
import Layout from '../components/Layout';
import FollowList from '../components/Profile/FollowList';
import ProfileInfo from '../components/Profile/ProfileInfo';

const followData = [
  { id: 1, email: 'ddahyoni@naver.com', nickname: '따효니' },
  { id: 2, email: 'chimchakman@naver.com', nickname: '침착맨' },
  { id: 3, email: 'poong@naver.com', nickname: '풍월량' },
];

const followerData = [
  { id: 4, email: 'zico@naver.com', nickname: '지코' },
  { id: 5, email: 'chul9@naver.com', nickname: '철구' },
];

function Profile() {
  return (
    <Layout>
      <ProfileInfo />

      <section className="grid md:grid-cols-2 md:gap-4">
        <FollowList label="팔로우" data={followData} />
        <FollowList label="팔로워" data={followerData} />
      </section>
    </Layout>
  );
}

export default Profile;
