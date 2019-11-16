import React from 'react';
import Avatar from 'components/common/Avatar';
import ProfileSetPopover from 'components/home/ProfileSetPopover';
import './Profile.scss';

const Profile = ({ myInfo, onUpdateNickName, onUpdateProfileImage }) => {
  const { profileImage, nickname } = myInfo;
  const maxLength = 15;
  const imageset = [
    'http://img.lifestyler.co.kr/uploads/program/1/1765/menu/2/html/f131755988183457049(0).jpg',
    'http://img.lifestyler.co.kr/uploads/program/1/1661/menu/2/html/f131611716040131952(0).jpg',
    'https://st3.depositphotos.com/1007566/12989/v/950/depositphotos_129895116-stock-illustration-hacker-character-avatar-icon.jpg',
    'https://cdn.instructables.com/ORIG/F9S/DYJK/GL4Z65GD/F9SDYJKGL4Z65GD.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnriGd02AT_WTLfqzuGc0H5ynNhisA_Nc_A-ylIyDZRtHj2pQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwLtfbLSjLDtF4Jk7v6Gs66nf_KOmVbSxyVx-XUKm4OMrYGkiH&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROklew0P0RjVD5L7ctmsY3FpfQdXqghQiGz_watjEEy-bKPcfC&s',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/batman_character_comics_superhero_avatar_nightman_dark-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/caption_america_avenger_avatar_marvel_character_movie-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/avatar_superman_DC_comics_superhero_character_inspiression_-128.png',
    'https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/superhero-deadpool-comics-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/military_caption_officer_army_police_avatar_javan-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/ganpati_ganesh_lord_god_blessing_bless_shivputra-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/scientist_einstein_avatar_knowledge_mad_scientific_science-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/teacher_note_professor_tutor_education_teaching_ladytutor-128.png',
    'https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/superhero-spiderman-comics-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/batgirl_character_supergirl_superhero_batman_comic_avatar-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/instructor_air_plane_guide_flag_handle_avatar-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/president_modi_namo_youthicon_leader_PM_avatar-128.png',
    'https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/programmer_coder_developer_encoder_engineer_computer_coding-128.png',
  ];

  return (
    <div id="profile">
      <section id="image-wrap">
        <button type="button" onClick={() => {}}>
          <Avatar src={profileImage} />
          <i className="material-icons">edit</i>
        </button>
      </section>
      <section id="nickname-wrap">
        <input
          type="text"
          className="input"
          defaultValue={nickname}
          maxLength={maxLength}
          placeholder="Enter nickname"
          onChange={(e) => {
            const value = e.target.value;

            if (value) {
              onUpdateNickName(value);
            }
          }}
        />
      </section>

      <ProfileSetPopover imageset={imageset} currentProfile={profileImage} onUpdate={onUpdateProfileImage} />
    </div>
  );
};

export default Profile;
