import React, { useEffect, useState } from "react";

type GitHubUser = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

const GithubProfile = ({ username }: { username: string }) => {
  const [user, setUser] = useState<GitHubUser | null>(null);

  console.log(user);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [username]);

  if (!user) return <p className="text-gray-500">Loading GitHub profile...</p>;

  return (
    <div className="w-full  h-full bg-white rounded shadow p-4 flex flex-col flex-wrap sm:flex-row gap-4">
      <a href={user.html_url} target="_blank" rel="noreferrer">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24  h-24 sm:w-32 sm:h-32 rounded-full object-cover"
        />
      </a>

      <div className="flex-1 ">
        <h2 className="text-lg font-bold text-gray-800">
          {user.name}{" "}
          <span className="text-sm text-gray-500">(@{user.login})</span>
        </h2>
        <p className="text-gray-600 text-sm mt-1">{user.bio}</p>

        <div className="flex gap-6 text-sm text-gray-700 mt-4">
          <div>
            <strong>{user.public_repos}</strong>
            <span className="ml-1">Repos</span>
          </div>
          <div>
            <strong>{user.followers}</strong>
            <span className="ml-1">Followers</span>
          </div>
          <div>
            <strong>{user.following}</strong>
            <span className="ml-1">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubProfile;
