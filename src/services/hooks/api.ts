import { useContext, useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import { GlobalContext } from '../../ContextWrapper';

interface DbUser {
  display_name: string;
  twitch_id: number;
  _id: string;
}

interface DbModerator {
  user_name: string;
  twitch_id: number;
  mod_for: [{ id: number; display_name: string }];
  _id: string;
}

interface UseDBUserProps {
  data?: DbUser[];
  error?: boolean;
}

interface UseModeratorProps {
  data?: DbModerator;
  error?: boolean;
}

const twitchClientId = 'jmyfr3xqjeyjkvzmnbyiexsf5864c1';
const redirectURI = `${window.location.origin}/TwitchAuth`;

const onErrorRetry = (error: any) => {
  if (error.data.status === 401 || error.data.status === 403) {
    return window.open(
      `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read%20moderation:read`,
      '_self',
    );
  }
  return null;
};

function useUser() {
  const { twitchId } = useContext(GlobalContext);

  const selfUrl = 'https://api.twitch.tv/helix/users';
  const otherUrl = `https://api.twitch.tv/helix/users?id=${twitchId}`;

  const url = twitchId ? otherUrl : selfUrl;
  const { data, error } = useSWR(url, fetcher, { onErrorRetry });

  return {
    data: data?.data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
}

function useDbUsers() {
  const { data, error }: UseDBUserProps = useSWR('/api/users', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useModerators() {
  const { data: userData, isError: userError } = useUser();

  const { data, error }: UseModeratorProps = useSWR(
    userData ? `/api/moderators/${userData.id}` : null,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useVideos() {
  const { data: userData } = useUser();
  const { data, error } = useSWR(
    () => `https://api.twitch.tv/helix/videos?first=20&type=archive&user_id=${userData.id}`,
    fetcher,
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useVideo(id: string | number) {
  const { data, error } = useSWR(
    () => `https://api.twitch.tv/helix/videos?first=20&type=archive&id=${id}`,
    fetcher,
  );

  return {
    data: data?.data?.[0],
    isLoading: !error && !data,
    isError: error,
  };
}

export interface IndividualTimestamp {
  sourceAttribution: any;
  startTime: number;
  endTime: number;
  selected?: boolean;
  verifiedTwitch?: boolean;
  id: string;
}

interface Algorithm {
  algo1: IndividualTimestamp[];
  algo2?: IndividualTimestamp[];
  algo3?: IndividualTimestamp[];
  algo4?: IndividualTimestamp[];
  algo5?: IndividualTimestamp[];
  brain: IndividualTimestamp[];
}

export interface IndividualThumbnail {
  string: any;
}

interface ThumbnailData {
  thumbnail: IndividualThumbnail;
}

interface TimestampStructure {
  videoId: string;
  _id: string;
  clips: Algorithm;
  ccc: IndividualTimestamp[];
  thumbnails: ThumbnailData[];
  manual: IndividualTimestamp[];
}

interface UseClipsDataProps {
  data?: TimestampStructure;
  error?: boolean;
}

function useClips(clipId: number | string | undefined) {
  const { data, error }: UseClipsDataProps = useSWR(
    clipId ? () => `/api/timestamps/${clipId}` : null,
    fetcher,
  );
  const alldata = useMemo(
    () => ({ ...data?.clips, ccc: data?.ccc, manual: data?.manual, thumbnails: data?.thumbnails }),
    [JSON.stringify(data)],
  );

  return {
    data: alldata,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isLoading: !error && !data,
    isError: error,
  };
}

export { useUser, useVideos, useVideo, useClips, useDbUsers, useModerators };
