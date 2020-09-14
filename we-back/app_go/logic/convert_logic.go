package logic

import (
	"app_go/entity"
	"app_go/json"
)

// ConvertItemToTask ItemをTaskに変換する
func ConvertItemToTask(item json.Item) entity.Task {
	var task entity.Task

	task.UserID = item.UserID
	task.TaskID = item.TaskID
	task.TaskName = item.TaskName
	task.TaskURL = item.TaskURL
	task.TaskMemo = item.TaskMemo
	task.Category = item.Category

	return task
}

// ConvertItemToPlan ItemをPlanに変換する
func ConvertItemToPlan(item json.Item) entity.Plan {
	var plan entity.Plan

	plan.UserID = item.UserID
	plan.PlanID = item.PlanID
	plan.PlanDate = item.PlanDate

	return plan
}

// ConvertTaskToItem TaskをItemに変換する
func ConvertTaskToItem(task entity.Task) json.Item {
	var item json.Item

	item.UserID = task.UserID
	item.TaskID = task.TaskID
	item.TaskName = task.TaskName
	item.TaskURL = task.TaskURL
	item.TaskMemo = task.TaskMemo
	item.Category = task.Category

	return item
}

// ConvertEntityToItem Task,PlanをItemに変換する
func ConvertEntityToItem(task entity.Task, plan entity.Plan) json.Item {
	item := ConvertTaskToItem(task)

	if &plan != nil {
		// 計画情報を追加
		item.PlanID = plan.PlanID
		item.PlanDate = plan.PlanDate
	}

	return item
}

// ConvertEntitiesToItems Task配列とPlanをItemに変換する
func ConvertEntitiesToItems(tasks []entity.Task, plan entity.Plan) []json.Item {
	var items []json.Item

	for _, task := range tasks {
		item := ConvertTaskToItem(task)
		if &plan != nil {
			// 計画情報を追加
			item.PlanID = plan.PlanID
			item.PlanDate = plan.PlanDate
		}
		items = append(items, item)
	}

	return items
}
