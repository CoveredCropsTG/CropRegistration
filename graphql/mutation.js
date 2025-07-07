import gql from 'graphql-tag';

export const INSERT_PLANT_DETAILS = gql `
    mutation insertPlantDetails($objects: [plant_details_insert_input!]!) {
        insert_plant_details(objects: $objects) {
            returning {
                floweringTrussHeight
                fullySetTruss
                id
                lastWeekStmDiameter
                leafLength
                leafWidth
                leavesPerPlant
                plantName
                plantNumber
                plantRow
                plantWeek
                setTrussLength
                stmDiameter
                weeklyGrowth
            }
        }
    }`

export const INSERT_TRUSS_DETAILS = gql `
    mutation insertTrussDetails($objects: [truss_details_insert_input!]!) {
        insert_truss_details(objects: $objects) {
            returning {
                floweringTruss
                fruitDiameter
                fruitLoad
                harvestTruss
                id
                plantName
                plantNumber
                plantRow
                plantWeek
                pruningFlower
                pruningHarvest
                pruningNumber
                pruningSet
                setFlowers
                setFruits
                settingTruss
                trussNumber
            }
        }
    }`