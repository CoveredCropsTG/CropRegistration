import gql from 'graphql-tag';

export const GET_PLANT_DETAILS = gql `
    query plantDetails {
        plant_details {
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
    }`

export const GET_TRUSS_DETAILS = gql `
    query trussDetails {
        truss_details {
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
    }`