import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { INewSkillsReducer } from '../../models-ts/reducers/new-skills-reducer-models'

const initialState: INewSkillsReducer = {
  education: [
    {
      title: '',
      finish: '',
      special: ''
    },
    {
      title: '',
      finish: '',
      special: ''
    },
    {
      title: '',
      finish: '',
      special: ''
    }
  ],
  skills: [
    { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' },
    { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' },
    { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' },
    { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' },
    { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' },
    { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' },
  ],
  focused: ''
}

const newSkillsReducer = createSlice({
  name: 'avatarReducer',
  initialState,
  reducers: {
    addInEducation1Title(state, action: PayloadAction<string>) { state.education[0].title = action.payload },
    addInEducation1Finish(state, action: PayloadAction<string>) { state.education[0].finish = action.payload },
    addInEducation1Special(state, action: PayloadAction<string>) { state.education[0].special = action.payload },

    addInEducation2Title(state, action: PayloadAction<string>) { state.education[1].title = action.payload },
    addInEducation2Finish(state, action: PayloadAction<string>) { state.education[1].finish = action.payload },
    addInEducation2Special(state, action: PayloadAction<string>) { state.education[1].special = action.payload },
    
    addInEducation3Title(state, action: PayloadAction<string>) { state.education[2].title = action.payload },
    addInEducation3Finish(state, action: PayloadAction<string>) { state.education[2].finish = action.payload },
    addInEducation3Special(state, action: PayloadAction<string>) { state.education[2].special = action.payload },

    addInSkills1Title(state, action: PayloadAction<string>) { state.skills[0].title = action.payload },
    addInSkills1Site(state, action: PayloadAction<string>) { state.skills[0].site = action.payload },
    addInSkills1Sm(state, action: PayloadAction<string>) { state.skills[0].sm = action.payload },
    addInSkills1Sy(state, action: PayloadAction<string>) { state.skills[0].sy = action.payload },
    addInSkills1Fm(state, action: PayloadAction<string>) { state.skills[0].fm = action.payload },
    addInSkills1Fy(state, action: PayloadAction<string>) { state.skills[0].fy = action.payload },
    addInSkills1NowTime(state, action: PayloadAction<boolean>) { state.skills[0].nowTime = action.payload },
    addInSkills1Job(state, action: PayloadAction<string>) { state.skills[0].job = action.payload },
    addInSkills1JobTasks(state, action: PayloadAction<string>) { state.skills[0].jobTasks = action.payload },

    addInSkills2Title(state, action: PayloadAction<string>) { state.skills[1].title = action.payload },
    addInSkills2Site(state, action: PayloadAction<string>) { state.skills[1].site = action.payload },
    addInSkills2Sm(state, action: PayloadAction<string>) { state.skills[1].sm = action.payload },
    addInSkills2Sy(state, action: PayloadAction<string>) { state.skills[1].sy = action.payload },
    addInSkills2Fm(state, action: PayloadAction<string>) { state.skills[1].fm = action.payload },
    addInSkills2Fy(state, action: PayloadAction<string>) { state.skills[1].fy = action.payload },
    addInSkills2NowTime(state, action: PayloadAction<boolean>) { state.skills[1].nowTime = action.payload },
    addInSkills2Job(state, action: PayloadAction<string>) { state.skills[1].job = action.payload },
    addInSkills2JobTasks(state, action: PayloadAction<string>) { state.skills[1].jobTasks = action.payload },

    addInSkills3Title(state, action: PayloadAction<string>) { state.skills[2].title = action.payload },
    addInSkills3Site(state, action: PayloadAction<string>) { state.skills[2].site = action.payload },
    addInSkills3Sm(state, action: PayloadAction<string>) { state.skills[2].sm = action.payload },
    addInSkills3Sy(state, action: PayloadAction<string>) { state.skills[2].sy = action.payload },
    addInSkills3Fm(state, action: PayloadAction<string>) { state.skills[2].fm = action.payload },
    addInSkills3Fy(state, action: PayloadAction<string>) { state.skills[2].fy = action.payload },
    addInSkills3NowTime(state, action: PayloadAction<boolean>) { state.skills[2].nowTime = action.payload },
    addInSkills3Job(state, action: PayloadAction<string>) { state.skills[2].job = action.payload },
    addInSkills3JobTasks(state, action: PayloadAction<string>) { state.skills[2].jobTasks = action.payload },

    addInSkills4Title(state, action: PayloadAction<string>) { state.skills[3].title = action.payload },
    addInSkills4Site(state, action: PayloadAction<string>) { state.skills[3].site = action.payload },
    addInSkills4Sm(state, action: PayloadAction<string>) { state.skills[3].sm = action.payload },
    addInSkills4Sy(state, action: PayloadAction<string>) { state.skills[3].sy = action.payload },
    addInSkills4Fm(state, action: PayloadAction<string>) { state.skills[3].fm = action.payload },
    addInSkills4Fy(state, action: PayloadAction<string>) { state.skills[3].fy = action.payload },
    addInSkills4NowTime(state, action: PayloadAction<boolean>) { state.skills[3].nowTime = action.payload },
    addInSkills4Job(state, action: PayloadAction<string>) { state.skills[3].job = action.payload },
    addInSkills4JobTasks(state, action: PayloadAction<string>) { state.skills[3].jobTasks = action.payload },

    addInSkills5Title(state, action: PayloadAction<string>) { state.skills[4].title = action.payload },
    addInSkills5Site(state, action: PayloadAction<string>) { state.skills[4].site = action.payload },
    addInSkills5Sm(state, action: PayloadAction<string>) { state.skills[4].sm = action.payload },
    addInSkills5Sy(state, action: PayloadAction<string>) { state.skills[4].sy = action.payload },
    addInSkills5Fm(state, action: PayloadAction<string>) { state.skills[4].fm = action.payload },
    addInSkills5Fy(state, action: PayloadAction<string>) { state.skills[4].fy = action.payload },
    addInSkills5NowTime(state, action: PayloadAction<boolean>) { state.skills[4].nowTime = action.payload },
    addInSkills5Job(state, action: PayloadAction<string>) { state.skills[4].job = action.payload },
    addInSkills5JobTasks(state, action: PayloadAction<string>) { state.skills[4].jobTasks = action.payload },

    addInSkills6Title(state, action: PayloadAction<string>) { state.skills[5].title = action.payload },
    addInSkills6Site(state, action: PayloadAction<string>) { state.skills[5].site = action.payload },
    addInSkills6Sm(state, action: PayloadAction<string>) { state.skills[5].sm = action.payload },
    addInSkills6Sy(state, action: PayloadAction<string>) { state.skills[5].sy = action.payload },
    addInSkills6Fm(state, action: PayloadAction<string>) { state.skills[5].fm = action.payload },
    addInSkills6Fy(state, action: PayloadAction<string>) { state.skills[5].fy = action.payload },
    addInSkills6NowTime(state, action: PayloadAction<boolean>) { state.skills[5].nowTime = action.payload },
    addInSkills6Job(state, action: PayloadAction<string>) { state.skills[5].job = action.payload },
    addInSkills6JobTasks(state, action: PayloadAction<string>) { state.skills[5].jobTasks = action.payload },

    removeFromEducation(state, action: PayloadAction<number>) {
      state.education[action.payload] = {
        title: '',
        finish: '',
        special: ''
      }
    },
    removeFromSkills(state, action: PayloadAction<number>) {
      state.skills[action.payload] = { title: '', site: '', sm: '', sy: '', fm: '', fy: '', nowTime: false, job: '', jobTasks: '' }
    },
    setFocused(state, action: PayloadAction<string>) {
      state.focused = action.payload
    }
  }
})

export const {
  addInEducation1Title, 
  addInEducation1Finish,
  addInEducation1Special,

  addInEducation2Title, 
  addInEducation2Finish,
  addInEducation2Special,

  addInEducation3Title, 
  addInEducation3Finish,
  addInEducation3Special,

  addInSkills1Title,
  addInSkills1Site,
  addInSkills1Sm,
  addInSkills1Sy,
  addInSkills1Fm,
  addInSkills1Fy,
  addInSkills1NowTime,
  addInSkills1Job,
  addInSkills1JobTasks,

  addInSkills2Title,
  addInSkills2Site,
  addInSkills2Sm,
  addInSkills2Sy,
  addInSkills2Fm,
  addInSkills2Fy,
  addInSkills2NowTime,
  addInSkills2Job,
  addInSkills2JobTasks,

  addInSkills3Title,
  addInSkills3Site,
  addInSkills3Sm,
  addInSkills3Sy,
  addInSkills3Fm,
  addInSkills3Fy,
  addInSkills3NowTime,
  addInSkills3Job,
  addInSkills3JobTasks,

  addInSkills4Title,
  addInSkills4Site,
  addInSkills4Sm,
  addInSkills4Sy,
  addInSkills4Fm,
  addInSkills4Fy,
  addInSkills4NowTime,
  addInSkills4Job,
  addInSkills4JobTasks,

  addInSkills5Title,
  addInSkills5Site,
  addInSkills5Sm,
  addInSkills5Sy,
  addInSkills5Fm,
  addInSkills5Fy,
  addInSkills5NowTime,
  addInSkills5Job,
  addInSkills5JobTasks,

  addInSkills6Title,
  addInSkills6Site,
  addInSkills6Sm,
  addInSkills6Sy,
  addInSkills6Fm,
  addInSkills6Fy,
  addInSkills6NowTime,
  addInSkills6Job,
  addInSkills6JobTasks,

  removeFromEducation, 
  removeFromSkills,
  setFocused } = newSkillsReducer.actions
export default newSkillsReducer.reducer